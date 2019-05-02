export default class Game {
  constructor (server, roomId) {
    this.server = server
    this.roomId = roomId
    this.room = null
    this.timeRemaining = 60 // How much time is remaining in the current round
    this.roundsRemaining = 2 // How many rounds are left until the game is over
    this.isGameOver = false // Checks if the game is over or not
    this.timer = null
    this.started = false
    this.currentDrawer = null
  }

  startGame () {
    if(!this.started || this.isGameOver){
      this.started = true
      this.isGameOver = false
      this.timer = setInterval(() => {
        if (this.timeRemaining > 0) { // If there is still time on the clock, reduce it
          this.timeRemaining -= 1
        } else { // Round is over
          if (this.roundsRemaining === 0) { // Game is over
            clearInterval(this.timer) // Stop the timer
            this.isGameOver = true
            this.room.systemChat("Game is now over!")
          } else { // Switch to a new round
            this.timeRemaining = 60 // Reset the clock for the next round
            this.roundsRemaining -= 1
            this.room.systemChat("Time has expired for this round, next round starting!")
          }
        }
        this.server.in(this.roomId).emit('timer-update', this.timeRemaining)
      }, 1000)
    } else {
      this.room.systemChat("The game has already started!")
    }
  }

  // Once the room is created to host this game session, the game session should be aware
  // of the room's existence too
  assignRoom (room) {
    this.room = room
  }

  // Gives each player 3 turns of drawing if less than 4 players
  // Or 2 drawing turns each when 4 players or more
  calculateTotalRounds (numberOfPlayers) {
    if(numberOfPlayers < 4){
      return numberOfPlayers * 3
    } else {
      return numberOfPlayers * 2
    }
  }
}
