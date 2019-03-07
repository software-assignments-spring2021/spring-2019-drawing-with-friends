import React from 'react'
import ReactDOM from 'react-dom'
import Footer from './components/Footer.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import ChatBox from './components/ChatBox.jsx'
import HelloWorld from './components/HelloWorld.jsx';

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <NavigationBar/>
        <div className="container">
          <HelloWorld />
          <ChatBox />
        </div>
        <Footer/>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('content'))
