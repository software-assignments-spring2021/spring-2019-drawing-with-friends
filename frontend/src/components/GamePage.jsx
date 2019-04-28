import * as React from 'react'
import Canvas from './Canvas/CanvasWrapper.jsx'
import '../css/GamePage.css'
import Chat from './Chat.jsx'
import io from 'socket.io-client'

class GamePage extends React.Component {
  constructor (props) {
    super(props)
    const { roomId } = this.props
    if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
      this.socket = io.connect('127.0.0.1:3000')
    } else if (window.location.href.includes('https://letsdraw.me')) {
      this.socket = io.connect('https://server.letsdraw.me')
    } else {
      this.socket = io.connect('https://devserver.letsdraw.me')
    }
    this.socket.emit('join-room', { roomId: roomId })
  }

  render () {
    return (
      <div className='gamePageContainer'>
        <div className='canvasContainer'>
          <Canvas socket={this.socket} />
        </div>

        <Chat socket={this.socket} />
      </div>
    )
  }
}

export default GamePage
