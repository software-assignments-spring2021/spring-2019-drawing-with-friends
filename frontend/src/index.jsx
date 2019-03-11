import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './components/HelloWorld.jsx'
import Footer from './components/Footer.jsx'
import NavigationBar from './components/NavigationBar.jsx'

class App extends React.Component {
  render () {
    return (
      <>
        <NavigationBar/>
        <HelloWorld/>
        <Footer/>
      </>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('main-container'))
