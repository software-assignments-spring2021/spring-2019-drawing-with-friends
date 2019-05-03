import 'regenerator-runtime/runtime'
import sleep from './utils/sleep.js'
import wordBank from './utils/wordbank'
import calculatePoints from './utils/calculatePoints'

export default class Game {
  constructor (server, roomId) {
    this.server = server
    this.roomId = roomId
    this.timeRemaining = 0
    this.pointsForTheRound = {}
    this.shouldScorePoints = false

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
    if (!this.gameState.isGameStarted) {
      this.gameState.isGameStarted = true
      const turnQueue = [...this.gameState.players, ...this.gameState.players]
      let wordbank = wordBank()

      while (turnQueue.length > 0) {
        const potentialDrawer = turnQueue.shift()
        if (this.gameState.players.includes(potentialDrawer)) {
          this.gameState.drawer = potentialDrawer
          if (wordbank.length === 0) {
            wordbank = wordBank()
          }
          this.gameState.currentWord = wordbank.shift()
          this.server.in(this.roomId).emit('erase-all')
          this.shouldScorePoints = true
        } else {
          continue
        }

        this.startTimer(60)
        await sleep(60000)
        this.shouldScorePoints = false
        await sleep(5000)
        this.pointsForTheRound = {}
      }

      this.gameState.isGameOver = true
    }
  }

  verifyChat (chatMessage, socketId) {
    const { currentWord, players } = this.gameState
    if (
        this.shouldScorePoints
        && this.gameState.drawer.playerId !== socketId
        && currentWord === chatMessage.message.trim().toLowerCase()
    ) {
      if (!this.pointsForTheRound[socketId]) {
        this.pointsForTheRound[socketId] = calculatePoints(this.timeRemaining)
        this.gameState.players = players.map((player) => {
          if (player.playerId === socketId) {
            player.score += this.pointsForTheRound[socketId]
          }
          return player
        })
      }
      return {
        name: chatMessage.name,
        message: chatMessage.message.replace(/./g, '*')
      }
    }
    return chatMessage
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
