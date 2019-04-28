import io from 'socket.io'
import Room from './room'
let port = process.env.PORT || 3000
const server = io.listen(port)

let history = []

// provides quick access to rooms by their IDs
const rooms = {}

// provides quick access to the room a player is a part of
const playersRooms = {}

server.on('connection', (socket) => {
  socket.on('create-room', (roomData) => {
    const { roomId } = roomData
    if (!rooms[roomId]) {
      socket.join(roomData.roomId)
      rooms[roomId] = new Room(roomId, socket.id, server)
      playersRooms[socket.id] = rooms[roomId]
      socket.emit('confirm-valid-room-code')
    } else {
      socket.emit('room-already-exists')
    }
  })

  socket.on('join-room', (roomData) => {
    const { roomId } = roomData
    if (rooms[roomId]) {
      socket.join(roomData.roomId)
      rooms[roomId].addPlayer(socket.id)
      playersRooms[socket.id] = rooms[roomId]
      socket.emit('confirm-valid-room-code')
    } else {
      socket.emit('room-does-not-exist')
    }
  })

  socket.on('chat', (chatMessage) => {
    if (playersRooms[socket.id]) { playersRooms[socket.id].chat(chatMessage) }
  })

  if (history.length !== 0) {
    socket.emit('history', history)
  }

  socket.on('draw', (data) => {
    history.push(data)
    socket.broadcast.emit('draw', data)
  })

  socket.on('erase-all', () => {
    history = []
    socket.broadcast.emit('erase-all')
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
      playersRooms[socket.id].removePlayer(socket.id)
      if (playersRooms[socket.id].roomMembers.length === 0) {
        delete rooms[playersRooms[socket.id].roomId]
      }
      delete playersRooms[socket.id]
    }
  })
})
