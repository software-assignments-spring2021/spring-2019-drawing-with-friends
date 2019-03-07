import React from 'react'

export default class ChatBox extends React.Component {
  render() {
    return (
      <div className="row">
        <center><h2>Chatbox</h2></center>
        <div className="col s3"></div>
        <div className="chatbox col s6">
          <ul id="chatbox-messages"></ul>
          <form action="">
            <div className="row">
              <div className="input-field col s10">
                <i className="material-icons prefix">send</i>
                <input id="message" type="text" autocomplete="off" />
                <label for="message">Send your message</label>
              </div>
              <button className="btn waves-effect waves-light col s2 chatbox-send" type="submit" name="action">Send</button>
            </div>
          </form>
        </div>
        <div className="col s3"></div>
      </div>
    )
  }
}
