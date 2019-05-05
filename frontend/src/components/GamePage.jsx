import * as React from 'react'
import Canvas from './Canvas/CanvasWrapper.jsx'
import '../css/GamePage.css'
import Chat from './Chat.jsx'
import { Redirect } from 'react-router-dom'
import playerComparator from '../utils/PlayersComparator'

export default class GamePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      goHome: false,
      isModalOpen: true,
      gameState: { players: [], drawer: {} },
      timerObject: {
        timeRemaining: 0
      }
    }
    this.closeModal = this.closeModal.bind(this)
    this.startGame = this.startGame.bind(this)

    this.props.socket.on('timer-update', (timeRemaining) => {
      this.setState({
        timerObject: {
          timeRemaining: timeRemaining
        }
      })
    })

    this.props.socket.on('game-update', (gameState) => {
      this.setState({ gameState })
    })

    this.props.socket.emit('get-game-update')
  }

  shouldComponentUpdate (_nextProps, nextState) {
    if (this.state.gameState.isGameOver) {
      if (nextState.gameState.players.length !== this.state.gameState.players.length) {
        return false
      }
    }
    return true
  }

  showModal () {
    return (
      <div className='instructionsModal'>
        <div className='instructionsModalContent'>
          <h4>{`What's This?`}</h4>
          <p>This is the staging area where you can wait for your friends to join.</p>
          <p>{`Once the room has four players (including yourself), any one can press "Start Game" to start!`}</p>
          <button onClick={this.closeModal}>Got it!</button>
        </div>
      </div>
    )
  }

  renderWinners () {
    return (
      <ol>
        {this.state.gameState.players
          .sort(playerComparator)
          .filter((player, index) => index < 3)
          .map((player) => {
            return <li key={player.playerId}>{player.name}: {player.score}</li>
          })}
      </ol>
    )
  }

  showWinners () {
    return (
      <div className='instructionsModal'>
        <div className='instructionsModalContent'>
          <h4>{`Game Over!`}</h4>
          <p>Here are the winners:</p>
          {this.renderWinners()}
          <button onClick={() => this.setState({ goHome: true })}>Play Again</button>
        </div>
      </div>
    )
  }

  closeModal () {
    this.setState({
      isModalOpen: false
    })
  }

  startGame (e) {
    e.preventDefault()
    this.props.socket.emit('start-game')
  }

  renderMessageBar () {
    const { currentWord, drawer, isGameStarted } = this.state.gameState
    return isGameStarted && drawer
      ? drawer.playerId === this.props.socket.id
        ? <h4>You are drawing: {currentWord}</h4>
        : <h4>{drawer.name} is currently drawing</h4>
      : <h4>Share this code with your friends: {this.props.roomId}</h4>
  }

  renderDrawerIcon (playerId) {
    return this.state.gameState.drawer && playerId === this.state.gameState.drawer.playerId ? '🖌️' : ''
  }

  renderPlayers () {
    return this.state.gameState.players.sort(playerComparator).map((player) => {
      return this.state.gameState.isGameStarted
        ? <p key={player.playerId}>{this.renderDrawerIcon(player.playerId)} {player.name}: {player.score}</p>
        : <p key={player.playerId}>{player.name}</p>
    })
  }

  renderStartButton () {
    return !this.state.gameState.isGameStarted ? <button onClick={this.startGame}>Start Game</button> : ''
  }

  renderTimer () {
    return this.state.timerObject.timeRemaining > 0 ? `Time Left: ${this.state.timerObject.timeRemaining}` : ''
  }

  render () {
    return (
      <>
        {this.state.isModalOpen ? this.showModal() : ''}
        {this.state.gameState.isGameOver ? this.showWinners() : ''}
        {this.state.goHome ? <Redirect to="/"/> : ''}
        <div className='gamePageContainer'>
          {this.renderMessageBar()}
          <div className='canvasContainer'>
            <Canvas socket={this.props.socket}/>
          </div>
          <Chat socket={this.props.socket} playerName={this.props.playerName}/>
          <div className='playerList'>
            <div className='playerNames'>
              {this.renderPlayers()}
            </div>
            {this.renderStartButton()}
          </div>
          <h4>{this.renderTimer()}</h4>
        </div>
      </>
    )
  }
}
