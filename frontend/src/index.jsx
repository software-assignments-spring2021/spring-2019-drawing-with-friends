import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './components/HelloWorld.jsx'

class App extends React.Component {
  render () {
    return <HelloWorld />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
