$(function () {
  var socket = io();
  $('form').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('send chat', $('#message').val());
    console.log("Sent message: " + $('#message').val());
    console.log(socket);
    $('#message').val('');
    return false;
  });

  socket.on('post message', function (name, msg) {
    $('#chatbox-messages').append($('<li>').text(name + ': ' + msg));
    console.log("Received message: " + msg);
  });
});