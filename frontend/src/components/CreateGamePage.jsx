import * as React from 'react'
import '../css/CreateGamePage.css'
import io from 'socket.io-client'
import GamePage from './GamePage.jsx'

class CreateGamePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roomCode: this.generateCode(),
      validRoomCode: false
    }

    if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
      this.socket = io.connect('127.0.0.1:3000')
    } else if (window.location.href.includes('https://letsdraw.me')) {
      this.socket = io.connect('https://server.letsdraw.me')
    } else {
      this.socket = io.connect('https://devserver.letsdraw.me')
    }
    this.socket.emit('create-room', { roomId: this.state.roomCode })

    this.socket.on('room-already-exists', () => {
      this.setState({ roomCode: this.generateCode() })
      this.socket.emit('create-room', { roomId: this.state.roomCode })
    })

    this.socket.on('confirm-valid-room-code', () => {
      this.setState({ validRoomCode: true })
    })
  }

  componentWillUnmount () {
    this.socket.disconnect()
  }

  generateCode () {
    let code = ''
    for (let i = 0; i < 4; i++) {
      // Decide if the character is a letter or number
      const numOrLetter = Math.random() * 10
      if (numOrLetter < 5) {
        code += `${Math.floor(Math.random() * 10)}`
      } else {
        code += `${String.fromCharCode(Math.random() * (91 - 65) + 65)}`
      }
    }
    return code
  }

  render () {
    return (
      this.state.validRoomCode
        ? <GamePage roomId={this.state.roomCode} socket={this.socket}/>
        : <div>Connecting... Please wait</div>
    )
  }
}

export default CreateGamePage
