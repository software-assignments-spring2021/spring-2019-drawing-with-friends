import * as React from 'react'
import '../css/JoinGamePage.css'
import GamePage from './GamePage.jsx'
import socketConnect from '../utils/SocketConnect';

class JoinGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      validRoomCode: false,
      incorrectRoomEntered: false,
      roomId: ''
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
    this.setState({ roomId: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.socket.emit('join-room', { roomId: this.state.roomId })
  }

  render () {
    if (this.state.validRoomCode) {
      return <GamePage roomId={this.state.roomId} socket={this.socket}/>
    }

    return (
      <div className='joinGameContainer'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.state.incorrectRoomEntered
            ? <p>Invalid room code Entered. Please double check and try again</p>
            : <p>Enter your room code below</p>}
          <input type='text' placeholder='Enter room code' onChange={this.handleChange.bind(this)}/>
          <input type="submit" value="Send"/>
        </form>
      </div>
    )
  }
}

export default JoinGame
