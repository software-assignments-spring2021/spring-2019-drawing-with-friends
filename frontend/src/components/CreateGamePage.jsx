import * as React from 'react'
import '../css/CreateGamePage.css'

class CreateGamePage extends React.Component {
  generateCode () {
    // Insert real logic here
    return 'ABC1'
  }

  render () {
    return (
      <div className='createGameContainer'>
        <h2>Share this code with your friends!</h2>
        <p>{this.generateCode()}</p>
      </div>
    )
  }
}

export default CreateGamePage
