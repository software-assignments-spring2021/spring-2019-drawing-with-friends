import io from 'socket.io'
import Room from './room'

const port = process.env.PORT || 3000
const server = io.listen(port)

let history = []

// provides quick access to rooms by their IDs
const rooms = {}

// provides quick access to the room a player is a part of
const playersRooms = {}

server.on('connection', (socket) => {
  socket.on('create-room', (roomData) => {
    const { roomId, name } = roomData
    if (!rooms[roomId]) {
      socket.join(roomId)
      rooms[roomId] = new Room(roomId, socket.id, server, name)
      playersRooms[socket.id] = rooms[roomId]
      socket.emit('confirm-valid-room-code')
    } else {
      socket.emit('room-already-exists')
    }
  })

  socket.on('join-room', (roomData) => {
    const { roomId, name } = roomData
    if (rooms[roomId] && !rooms[roomId].gameSession.gameState.isGameStarted) {
      socket.join(roomId)
      rooms[roomId].gameSession.addPlayer(socket.id, name)
      playersRooms[socket.id] = rooms[roomId]
      socket.emit('confirm-valid-room-code')
    } else {
      socket.emit('room-does-not-exist')
    }
  })

  socket.on('get-chat-history', () => {
    if (playersRooms[socket.id]) playersRooms[socket.id].getChatHistory()
  })

  socket.on('chat', (chatMessage) => {
    if (playersRooms[socket.id]) playersRooms[socket.id].chat(chatMessage, socket.id)
  })

  socket.on('start-game', () => {
    if (playersRooms[socket.id]) playersRooms[socket.id].gameSession.startGame()
  })

  socket.on('get-game-update', () => {
    if (playersRooms[socket.id]) server.to(socket.id).emit('game-update', playersRooms[socket.id].gameSession.gameState)
  })

  if (history.length !== 0) {
    socket.emit('history', history)
  }

  socket.on('draw', (data) => {
    history.push(data)
    if (playersRooms[socket.id] &&
        playersRooms[socket.id].gameSession.gameState.drawer &&
        playersRooms[socket.id].gameSession.gameState.drawer.playerId === socket.id
    ) {
      server.to(playersRooms[socket.id].roomId).emit('draw', data)
    }
  })

  socket.on('erase-all', () => {
    history = []
    if (playersRooms[socket.id]) socket.to(playersRooms[socket.id].roomId).emit('erase-all')
  })

  socket.on('undo', () => {
    let draw = history.pop()
    socket.broadcast('undo', draw)
  })

  socket.on('recalibrate', () => {
    socket.broadcast('history', history)
  })

  socket.on('disconnect', () => {
    if (playersRooms[socket.id]) {
      playersRooms[socket.id].gameSession.removePlayer(socket.id)
      if (playersRooms[socket.id].gameSession.gameState.players.length === 0) {
        delete rooms[playersRooms[socket.id].roomId]
      }
      delete playersRooms[socket.id]
    }
  })
})
