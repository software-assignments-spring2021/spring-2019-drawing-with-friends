import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './components/HelloWorld.jsx'
import Footer from './components/Footer.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import Canvas from './components/Canvas/CanvasWrapper.jsx'

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <NavigationBar/>
        <HelloWorld/>
        <Canvas />
        <Footer/>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('main-container'))
