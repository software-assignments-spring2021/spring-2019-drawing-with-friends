import Game from './game'

export default class Room {
  constructor (roomId, roomCreator, server, roomCreatorName) {
    this.server = server
    this.roomId = roomId
    this.gameSession = new Game(this.server, this.roomId, this)
    this.gameSession.addPlayer(roomCreator, roomCreatorName)
    this.chatMessages = []
  }

  chat (chatMessage, socketId) {
    // Make sure incoming messages are less than 128 characters
    // This should've been filtered on the client side
    if(chatMessage.message.length <= 128){
      this.chatMessages.push(this.gameSession.verifyChat(chatMessage, socketId))
      this.server.in(this.roomId).emit('chat-update', this.chatMessages)
    }

    // Clean chat messages because of memory constraint
    // Clients will be updated with the new server chat messages, no need to implement this client side
    while(this.chatMessages.length > 250){
      this.chatMessages.shift()
    }
  }

  systemChat (systemMessage) {
    this.chatMessages.push({
      name: 'System',
      message: systemMessage,
      isSystem: true
    })
    this.server.in(this.roomId).emit('chat-update', this.chatMessages)
  }

  getChatHistory () {
    this.server.in(this.roomId).emit('chat-update', this.chatMessages)
  }
}
