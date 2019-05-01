import * as React from 'react'
import '../css/CreateGamePage.css'
import GamePage from './GamePage.jsx'
import socketConnect from '../utils/SocketConnect'
import generateCode from '../utils/GenerateCode'

class CreateGamePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roomCode: generateCode(),
      validRoomCode: false,
      name: ''
    }

    this.socket = socketConnect()
    this.socket.on('room-already-exists', () => {
      this.setState({ roomCode: generateCode() })
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
