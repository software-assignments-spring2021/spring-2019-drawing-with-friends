import * as React from 'react'
import '../css/CreateGamePage.css'
import GamePage from './GamePage.jsx'
import socketConnect from '../utils/SocketConnect'

class CreateGamePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roomCode: this.generateCode(),
      validRoomCode: false,
      name: ''
    }

    this.socket = socketConnect()
    this.socket.on('room-already-exists', () => {
      this.setState({ roomCode: this.generateCode() })
      this.socket.emit('create-room', { roomId: this.state.roomCode, name: this.state.name })
    })

    this.socket.on('confirm-valid-room-code', () => {
      this.setState({ validRoomCode: true })
    })
  }

  componentWillUnmount () {
    this.socket.disconnect()
  }

  handleChange (e) {
    this.setState({ name: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.socket.emit('create-room', { roomId: this.state.roomCode, name: this.state.name })
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
        ? <GamePage roomId={this.state.roomCode} socket={this.socket} playerName={this.state.name}/>
        : <div className='createGameContainer'>
          <form onSubmit={this.handleSubmit.bind(this)} className='createGameForm'>
            <input type='text' placeholder='Enter your name' onChange={this.handleChange.bind(this)}/>
            <input type="submit" value="Join" disabled={!this.state.name} />
          </form>
        </div>
    )
  }
}

export default CreateGamePage
