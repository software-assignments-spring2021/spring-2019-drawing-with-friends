import io from 'socket.io'
const server = io.listen(3000)

server.on('connection', (socket) => {
  console.log('user connected')
  socket.emit('welcome', 'welcome man')

  socket.on('draw', (data) => {
    console.log("Received 'draw' event at (" + data.x + ", " + data.y + ")")
    socket.broadcast.emit('draw', data);
  })
})
