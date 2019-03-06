// Imports from libraries
const socketio = require('socket.io');

// Javascript Node variables.
let server;
let rooms = [];

// Start listening for connections on current host
server = socketio.listen(3000);
console.log("Server is now listening on port 3000");

// Server actions on receiving events
server.on('connection', function(client) {
  // Debug message to log on connection
  client.emit('log', "Connection established to server");

  // Option for client to create a room
  client.on('create room')
});
