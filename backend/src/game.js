import sleep from './utils/sleep.js'

export default class Game {
  constructor (server, roomId) {
    this.server = server
    this.roomId = roomId
    this.gameIsStarted = false
    this.timeRemaining = 0

    const proxyUpdateHandler = {
      set: (obj, prop, value) => {
        obj[prop] = value
        this.server.in(this.roomId).emit('game-update', this.gameState)
        return true
      }
    }
    this.gameState = new Proxy({
      isGameOver: false,
      players: [],
      drawer: undefined
    }, proxyUpdateHandler)
  }

  addPlayer (id, name) {
    this.gameState.players.push({ playerId: id, name: name, connected: true, score: 0 })
    this.server.in(this.roomId).emit('game-update', this.gameState)
  }

  removePlayer (playerId) {
    this.gameState.players = this.gameState.players.filter(player => playerId !== player.playerId)
  }

  async startGame () {
    this.gameIsStarted = true
    const turnQueue = [...this.gameState.players, ...this.gameState.players]

    while (turnQueue.length > 0) {
      const potentialDrawer = turnQueue.shift()
      if (this.gameState.players.includes(potentialDrawer)) {
        this.gameState.drawer = potentialDrawer
      } else {
        continue
      }
      // get element from word bank that has not been picked before

      this.startTimer(60)
      await sleep(63000)
    }
  }

  startTimer (duration) {
    this.timeRemaining = duration
    const timer = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining -= 1
      } else {
        clearInterval(timer)
      }
      this.server.in(this.roomId).emit('timer-update', this.timeRemaining)
    }, 1000)
  }
}
