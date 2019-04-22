import * as React from 'react'
import '../css/JoinGamePage.css'
import GamePage from './GamePage.jsx'

class JoinGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isGameStarted: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    event.preventDefault()
    this.setState({
      isGameStarted: true
    })
  }

  render () {
    if (this.state.isGameStarted) {
      return <GamePage />
    }

    return (
      <div className='joinGameContainer'>
        <form>
          <input type='text' placeholder='Enter room code'/>
          <button onClick={this.handleClick}>Submit</button>
        </form>
      </div>
    )
  }
}

export default JoinGame
