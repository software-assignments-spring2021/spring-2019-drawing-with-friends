import * as React from 'react'
import Canvas from './Canvas/CanvasWrapper.jsx'
import '../css/GamePage.css'
import Chat from './Chat.jsx'

class GamePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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

  showModal () {
    return (
      <div className='instructionsModal'>
        <div className='instructionsModalContent'>
          <h4>{`What's This?`}</h4>
          <p>This is the staging area where you can wait for your friends to join.</p>
          <p>{`You can practice drawing on the canvas on this page and chat with your friends. 
            When you're ready to start, press "Start Game"!`}</p>
          <button onClick={this.closeModal}>Got it!</button>
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
        ? <h4>You are drawing {currentWord}</h4>
        : <h4>{drawer.name} is currently drawing</h4>
      : <h4>Share this code with your friends: {this.props.roomId}</h4>
  }

  renderPlayers () {
    return this.state.gameState.players.map((player) => {
      return this.state.gameState.isGameStarted
        ? <p key={player.playerId}>{player.name}: {player.score}</p>
        : <p key={player.playerId}>{player.name}</p>
    })
  }

  render () {
    return (
      <>
        {this.state.isModalOpen ? this.showModal() : ''}
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
            <button onClick={this.startGame}>Start Game</button>
          </div>
          <h4>{this.state.timerObject.timeRemaining}</h4>
        </div>
      </>
    )
  }
}

export default GamePage
