import * as React from 'react'
import '../css/GamePage.css'

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chatMessages: [],
      chatInputValue: ''
    }

    this.props.socket.on('chat-update', (chatMessages) => {
      this.setState({ chatMessages: chatMessages })
    })
  }

  handleChange (e) {
    this.setState({ chatInputValue: e.target.value })
  }

  renderChatMessages () {
    return this.state.chatMessages.map((message, index) => {
      return (
        <p key={index}>
          {message.message}
        </p>
      )
    })
  }

  sendMessage (e) {
    e.preventDefault()
    this.props.socket.emit('chat', {
      message: this.state.chatInputValue
    })
    this.setState({ chatInputValue: '' })
  }

  render () {
    return (
      <div className='chatContainer'>
        <div className='chatInfo'>
            Chat!
        </div>
        <form id="chat-input" onSubmit={this.sendMessage.bind(this)} >
          <input
            type="text"
            placeholder='Chat here...'
            onChange={this.handleChange.bind(this)}
            value={this.state.chatInputValue}
          />
          <input type="submit" value="Send"/>
        </form>
        {this.renderChatMessages()}
      </div>
    )
  }
}

export default Chat
