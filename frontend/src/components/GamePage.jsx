import * as React from 'react'
import Canvas from './Canvas/CanvasWrapper.jsx'
import '../css/GamePage.css'

class GamePage extends React.Component {
  render () {
    return (
      <div className='gamePageContainer'>
        <div className='canvasContainer'>
          <Canvas/>
        </div>

        <div className='chatContainer'>
          <div className='chatInfo'>
            Put text from the chat here!
          </div>
          <form>
            <textarea placeholder='Enter your answer!'/>
          </form>
        </div>
      </div>
    )
  }
}

export default GamePage
