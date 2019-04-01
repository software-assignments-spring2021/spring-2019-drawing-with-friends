import * as React from 'react'
import p5 from 'p5'
import canvas from './DrawingCanvas.js'

class CanvasWrapper extends React.Component {
  componentDidMount () {
    // eslint-disable-next-line
    this.canvas = new p5(canvas, 'canvas') // eslint says p5 is not valid since it starts with a lowercase so disable for now
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
