// NodeJS module dependencies
const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Heroku offers an ephemeral port that may not be the same each time
// If not deploying on Heroku, you can access via port 8080 when running locally
const port = process.env.PORT || 8080;

// HTTP (wrapped with express) will now listen on the port
server.listen(port);
console.log("Express HTTP and Socket.io now serving on port " + port);

// Express will serve everything that react built statically
app.use(express.static('dist'));

io.on("connection", (client) => {
  let clientName = client.handshake.address;
  console.log("Client " + clientName + " connected to chatbox");

  client.on("send chat", (message) => {
    console.log("Client " + clientName + " sent message " + message);
    io.emit("post message", clientName, message);
  });

  client.on("disconnect", () => {
    console.log("Client " + clientName + " disconnected");
  });
});
