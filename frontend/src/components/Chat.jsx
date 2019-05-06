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
      const chatDiv = document.getElementsByClassName('messages')[0]
      chatDiv.scrollTop = chatDiv.scrollHeight
    })

    this.props.socket.emit('get-chat-history')
  }

  handleChange (e) {
    this.setState({ chatInputValue: e.target.value })
  }

  renderChatMessages () {
    const messages = this.state.chatMessages.map((message, index) => {
      if ('isSystem' in message && message.isSystem) {
        return (
          <p key={index} style={{ color: 'red' }}>
            🎨 {message.message}
          </p>
        )
      } else {
        return (
          <p key={index}>
            {message.name}: {message.message}
          </p>
        )
      }
    })

    return <div className='messages'>
      {messages}
    </div>
  }

  sendMessage (e) {
    e.preventDefault()
    if (this.state.chatInputValue && this.state.chatInputValue.length <= 128) {
      this.props.socket.emit('chat', {
        name: this.props.playerName,
        message: this.state.chatInputValue
      })
      this.setState({ chatInputValue: '' })
    } else {
      this.setState({ chatInputValue: '' })
    }
  }

  render () {
    return (
      <div className='chatContainer'>
        {this.renderChatMessages()}
        <form id="chat-input" onSubmit={this.sendMessage.bind(this)} >
          <input
            type="text"
            placeholder='Chat here... 128 char limit'
            onChange={this.handleChange.bind(this)}
            value={this.state.chatInputValue}
          />
          <input type="submit" value="Send"/>
        </form>
      </div>
    )
  }
}

export default Chat
