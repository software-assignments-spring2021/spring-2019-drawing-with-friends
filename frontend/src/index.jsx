import React from 'react'
import ReactDOM from 'react-dom'
import Canvas from './components/Canvas/CanvasWrapper.jsx'

class App extends React.Component {
  render () {
    return (
      <Canvas />
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('main-container'))
