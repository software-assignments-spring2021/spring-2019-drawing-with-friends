import * as React from 'react'
import '../css/CreateGamePage.css'

class CreateGamePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roomCode: this.generateCode()
    }
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
      <div className='createGameContainer'>
        <h2>Share this code with your friends!</h2>
        <p>{this.state.roomCode}</p>
      </div>
    )
  }
}

export default CreateGamePage
