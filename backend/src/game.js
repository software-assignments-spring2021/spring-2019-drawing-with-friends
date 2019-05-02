export default class Game {
  constructor (server, roomId) {
    this.server = server
    this.roomId = roomId
    this.gameIsStarted = false
    this.timeRemaining = 60 // How much time is remaining in the current round
    this.roundsRemaining = 2 // How many rounds are left until the game is over

    const proxyUpdateHandler = {
      set: (obj, prop, value) => {
        obj[prop] = value
        this.server.in(this.roomId).emit('game-update', this.gameState)
        return true
      }
    }
    this.gameState = new Proxy({
      isGameOver: false,
      players: []
    }, proxyUpdateHandler)
    this.server.in(this.roomId).emit('game-update', this.gameState)
  }

  addPlayer (id, name) {
    this.gameState.players.push({ playerId: id, name: name, connected: true, score: 0 })
    this.server.in(this.roomId).emit('game-update', this.gameState)
  }

  removePlayer (playerId) {
    this.gameState.players = this.gameState.players.filter(player => playerId !== player.playerId)
  }

  startGame () {
    this.gameIsStarted = true
    this.startTimer()
  }

  startTimer () {
    const timer = setInterval(() => {
      if (this.timeRemaining > 0) { // If there is still time on the clock, reduce it
        this.timeRemaining -= 1
      } else { // Round is over
        if (this.roundsRemaining === 0) { // Game is over
          clearInterval(timer) // Stop the timer
          this.gameState.isGameOver = true
        } else { // Switch to a new round
          this.timeRemaining = 60 // Reset the clock for the next round
          this.roundsRemaining -= 1
        }
      }
      this.server.in(this.roomId).emit('timer-update', this.timeRemaining)
    }, 1000)
  }

  // Gives each player in the room 2 turns
  calculateTotalRounds (numberOfPlayers) {
    return numberOfPlayers * 2
  }
}
