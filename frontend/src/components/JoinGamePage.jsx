import * as React from 'react'
import '../css/JoinGamePage.css'

class JoinGame extends React.Component {
  render () {
    return (
      <div className='joinGameContainer'>
        <form>
          <input type='text' placeholder='Enter room code'/>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

export default JoinGame
