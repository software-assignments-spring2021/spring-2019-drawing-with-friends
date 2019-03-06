const server = require('socket.io');
const rooms = [];

server.on('connection', function(client) {
  // Debug message to log on connection
  client.emit('log', "Connection established to server");

  // Option for client to create a room
  client.on('create room')
});

server.listen(3000);
console.log("Server is now listening on port 3000");
