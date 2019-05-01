export default class Room {
  constructor (roomId, roomCreator, server, roomCreatorName, game) {
    this.server = server
    this.roomId = roomId
    this.roomMembers = []
    this.roomMembers.push({ playerId: roomCreator, name: roomCreatorName })
    this.roomAdmin = roomCreator
    this.chatMessages = []
    this.gameSession = game
  }

  addPlayer (id, name) {
    this.roomMembers.push({ playerId: id, name: name })
  }

  chat (chatMessage) {
    this.chatMessages.push(chatMessage)
    this.server.in(this.roomId).emit('chat-update', this.chatMessages)
  }

  getChatHistory () {
    this.server.in(this.roomId).emit('chat-update', this.chatMessages)
  }

  removePlayer (player) {
    this.roomMembers = this.roomMembers.filter(playerObj => player !== playerObj.playerId)
  }
}
