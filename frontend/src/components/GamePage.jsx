import * as React from 'react'
import Canvas from './Canvas/CanvasWrapper.jsx'
import '../css/GamePage.css'
import Chat from './Chat.jsx'

class GamePage extends React.Component {
  render () {
    return (
      <div>
        <h4>Share this code with your friends: {this.props.roomId}</h4>
        <div className='gamePageContainer'>
          <div className='canvasContainer'>
            <Canvas socket={this.props.socket} />
          </div>

          <Chat socket={this.props.socket} playerName={this.props.playerName}/>
        </div>
      </div>
    )
  }
}

export default GamePage
