// Imports from libraries
// Socket io is our web socket handler
const socketio = require('socket.io');
// Moment is our official time keeper
const moment = require('moment');

// Javascript Node variables.
let server;
let rooms = {};

// Start listening for connections on current host
server = socketio.listen(3000);
console.log("Server is now listening on port 3000");

// Server actions on receiving events
server.on('connection', (client) => {
  // Debug message to log on connection
  client.emit('log', "Connection established to server");

  // Option for client to create a room
  client.on('create room', (client) => {
    console.log("Client requested to create room");

    // Generate a random string as the room ID
    let randomID = Math.random().toString(36).substring(2, 15);

    // Inform the client that the room has been created
    client.emit('room allocation', randomID);

    // Initialize the room in our dictionary
    rooms[randomID] = {
      // Keeps track of the ID of the room
      id: randomID,
      // Keeps track of the timestamp it got created
      created: moment.format('x'),
      // Keeps track of the users in the room
      users: []
    };
    console.log("Room allocation complete, new room with ID " + randomID);
  });

  client.on('join room', (client, roomID) => {
    if (roomID in rooms) {
      console.log("Client joining room " + roomID);

      rooms[roomID].users.push(client);

      console.log("Client successfully joined room " + roomID);
    } else {
      client.emit('error', "Room no longer exists!");
    }
  });

  client.on('leave room', (client, roomID) => {
    console.log("Client leaving room " + roomID);
    if (client in rooms[roomID].users){
      rooms[roomID].users = rooms[roomID].users.filter((user) => {
        return user != client;
      });
      console.log("Client left from room " + roomID);
    }
  });

  client.on('disconnect', (client) => {
    console.log("Removing client from any rooms they might be in");
    for (room in rooms) {
      if (client in room.users){
        room.users = room.user.filter((user) => {
          return user != client;
        });

        console.log("Client removed due to disconnect from room " + roomID);
      }
    }
  });
});
