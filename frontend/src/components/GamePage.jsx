import * as React from 'react'
import Canvas from './Canvas/CanvasWrapper.jsx'
import '../css/GamePage.css'

class GamePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chatMessages: [
        {
          id: 1,
          author: 'Jeph',
          message: 'Test message :)'
        }
      ]
    }
  }

  renderChatMessages () {
    return this.state.chatMessages.map((message) => {
      return (
        <p key={message.id}>
          {message.author}: {message.message}
        </p>
      )
    })
  }

  render () {
    return (
      <div className='gamePageContainer'>
        <div className='canvasContainer'>
          <Canvas/>
        </div>

        <div className='chatContainer'>
          <div className='chatInfo'>
            Put text from the chat here!
          </div>
          <form>
            <textarea placeholder='Enter your answer!'/>
          </form>
          {this.renderChatMessages()}
        </div>
      </div>
    )
  }
}

export default GamePage
