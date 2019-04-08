import * as React from 'react'
import P5 from 'p5'
import canvas from './DrawingCanvas.js'

class CanvasWrapper extends React.Component {
  componentDidMount () {
    this.canvas = new P5(canvas, 'canvas')
  }

  shouldComponentUpdate () { // just in case
    return false
  }

  componentWillUnmount () {
    this.canvas.remove()
  }

  render () {
    return (
      <div id="canvas"/>
    )
  }
}

export default CanvasWrapper
