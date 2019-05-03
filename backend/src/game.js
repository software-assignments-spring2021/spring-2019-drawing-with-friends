import sleep from './utils/sleep.js'
import wordBank from './utils/wordbank'
import 'regenerator-runtime/runtime'

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
      isGameStarted: false,
      isGameOver: false,
      players: [],
      drawer: undefined,
      currentWord: undefined
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
    this.gameState.isGameStarted = true
    const turnQueue = [...this.gameState.players, ...this.gameState.players]
    const wordbank = wordBank()
    this.gameState.currentWord = wordbank.shift()

    while (turnQueue.length > 0) {
      const potentialDrawer = turnQueue.shift()
      if (this.gameState.players.includes(potentialDrawer)) {
        this.gameState.drawer = potentialDrawer
        this.gameState.currentWord = wordbank.shift()
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
