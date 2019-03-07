import React from 'react'

export default class ChatBox extends React.Component {
  render() {
    return (
      <div className="row">
        <center><h2>Chatbox</h2></center>
        <div class="col s3"></div>
        <div className="chatbox col s6">
          <ul id="chatbox-messages"></ul>
          <form action="">
            <div class="row">
              <div class="input-field col s10">
                <i class="material-icons prefix">send</i>
                <input id="message" type="text" class="validate" autocomplete="off" />
                <label for="message">Send your message</label>
              </div>
              <button class="btn waves-effect waves-light col s2 chatbox-send" type="submit" name="action">Send</button>
            </div>
          </form>
        </div>
        <div class="col s3"></div>
      </div>
    )
  }
}
