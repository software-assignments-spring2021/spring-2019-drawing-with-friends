import io from 'socket.io'
let port = process.env.PORT || 3000;
const server = io.listen(port)

server.on('connection', (socket) => {
  console.log('user connected')
  socket.emit('welcome', 'welcome man')

  socket.on('draw', (data) => {
    console.log("Received 'draw' event at (" + data.x + ", " + data.y + ")")
    socket.broadcast.emit('draw', data);
  })
})
