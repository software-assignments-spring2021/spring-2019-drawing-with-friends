export default class Room {
  constructor (roomId, roomCreator, server) {
    this.server = server
    this.roomId = roomId
    this.roomMembers = []
    this.roomMembers.push(roomCreator)
    this.roomAdmin = roomCreator
    this.chatMessages = []
  }

  addPlayer (player) {
    this.roomMembers.push(player)
  }

  chat (chatMessage) {
    this.chatMessages.push(chatMessage)
    this.server.in(this.roomId).emit('chat-update', this.chatMessages)
  }
}
