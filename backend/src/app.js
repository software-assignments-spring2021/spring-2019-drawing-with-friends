import io from 'socket.io'
let port = process.env.PORT || 3000
const server = io.listen(port)

let history = [];

server.on('connection', (socket) => {
  console.log('user connected')
  socket.emit('welcome', 'welcome man')

  if(history.length != 0){
    socket.emit('history', history)
  }

  socket.on('draw', (data) => {
    console.log("Received 'draw' event at (" + data.x + ', ' + data.y + ') from client IP ' + socket.handshake.address)
    history.push(data)
    socket.broadcast.emit('draw', data)
  })

  socket.on('erase-all', () => {
    console.log('erase all')
    history = [];
    socket.broadcast.emit('erase-all')
  })

  socket.on('undo', () => {
    console.log('undo event')
    let draw = history.pop()
    socket.broadcast('undo', draw)
  })

  socket.on('recalibrate', () => {
    console.log('recalibrate from client IP ' + socket.handshake.address)
    socket.broadcast('history', history)
  })
})
