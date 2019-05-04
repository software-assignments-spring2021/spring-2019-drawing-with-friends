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
    this.chatMessages.push(this.gameSession.verifyChat(chatMessage, socketId))
    this.server.in(this.roomId).emit('chat-update', this.chatMessages)
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
