import Game from './game'

export default class Room {
  constructor (roomId, roomCreator, server, roomCreatorName) {
    this.server = server
    this.roomId = roomId
    this.gameSession = new Game(this.server, this.roomId)
    this.gameSession.addPlayer(roomCreator, roomCreatorName)
    this.chatMessages = []
  }

  chat (chatMessage) {
    this.chatMessages.push(chatMessage)
    this.server.in(this.roomId).emit('chat-update', this.chatMessages)
  }

  getChatHistory () {
    this.server.in(this.roomId).emit('chat-update', this.chatMessages)
  }
}
