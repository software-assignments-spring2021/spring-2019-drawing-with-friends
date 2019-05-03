import * as React from 'react'
import '../css/JoinGamePage.css'
import GamePage from './GamePage.jsx'
import socketConnect from '../utils/SocketConnect'

class JoinGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      validRoomCode: false,
      incorrectRoomEntered: false,
      roomId: '',
      name: ''
    }

    this.socket = socketConnect()
    this.socket.on('room-does-not-exist', () => {
      this.setState({ validRoomCode: false, incorrectRoomEntered: true })
    })

    this.socket.on('confirm-valid-room-code', () => {
      this.setState({ validRoomCode: true })
    })
  }

  componentWillUnmount () {
    this.socket.disconnect()
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value.trim() })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.socket.emit('join-room', { roomId: this.state.roomId, name: this.state.name })
  }

  render () {
    if (this.state.validRoomCode) {
      return <GamePage roomId={this.state.roomId} socket={this.socket} playerName={this.state.name}/>
    }

    return (
      <div className='joinGameContainer'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.state.incorrectRoomEntered
            ? <p>Invalid room code Entered. Please double check and try again</p>
            : <p>Enter your room code below</p>}
          <input name="name" type='text' placeholder='Enter your name' onChange={this.handleChange.bind(this)}/>
          <input name="roomId" type='text' placeholder='Enter room code' onChange={this.handleChange.bind(this)}/>
          <input type="submit" value="Join" disabled={!this.state.name || !this.state.roomId}/>
        </form>
      </div>
    )
  }
}

export default JoinGame
