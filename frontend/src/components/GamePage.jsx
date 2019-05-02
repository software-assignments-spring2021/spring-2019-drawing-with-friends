import * as React from 'react'
import Canvas from './Canvas/CanvasWrapper.jsx'
import '../css/GamePage.css'
import Chat from './Chat.jsx'

class GamePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalOpen: true,
      gameState: { players: [] },
      timerObject: {
        timeRemaining: 0,
        roundsRemaining: 2,
        isGameOver: false,
        isGameStarted: false
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
      console.log(gameState)
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
    let gameCopy = Object.assign({}, this.state.gameObject)
    gameCopy.isGameStarted = true
    this.setState({
      gameObject: gameCopy
    })
    this.props.socket.emit('start-game')
  }

  renderPlayers () {
    return this.state.gameState.players.map((player) => {
      return <p key={player.playerId}>{player.name}</p>
    })
  }

  render () {
    return (
      <>
        {this.state.isModalOpen ? this.showModal() : ''}
        <div className='gamePageContainer'>
          <h4>Share this code with your friends: {this.props.roomId}</h4>
          <div className='canvasContainer'>
            <Canvas socket={this.props.socket} />
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
