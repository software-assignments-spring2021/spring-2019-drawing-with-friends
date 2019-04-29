import * as React from 'react'
import Canvas from './Canvas/CanvasWrapper.jsx'
import '../css/GamePage.css'
import Chat from './Chat.jsx'

class GamePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalOpen: true
    }

    this.closeModal = this.closeModal.bind(this)
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

  render () {
    return (
      <React.Fragment>
        {this.state.isModalOpen ? this.showModal() : ''}
        <div className='gamePageContainer'>
          <h4>Share this code with your friends: {this.props.roomId}</h4>
          <div className='canvasContainer'>
            <Canvas socket={this.props.socket} />
          </div>
          <Chat socket={this.props.socket} playerName={this.props.playerName}/>
        </div>
      </React.Fragment>
    )
  }
}

export default GamePage
