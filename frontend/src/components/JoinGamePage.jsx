import * as React from 'react'
import '../css/JoinGamePage.css'
import GamePage from './GamePage.jsx'

class JoinGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isGameStarted: false,
      roomId: ''
    }
  }

  handleChange (e) {
    this.setState({ roomId: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({
      isGameStarted: true
    })
  }

  render () {
    if (this.state.isGameStarted) {
      return <GamePage roomId={this.state.roomId}/>
    }

    return (
      <div className='joinGameContainer'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' placeholder='Enter room code' onChange={this.handleChange.bind(this)}/>
          <input type="submit" value="Send"/>
        </form>
      </div>
    )
  }
}

export default JoinGame
