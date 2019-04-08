import * as React from 'react'
import '../../css/Greeting.css'
import pencilSvg from '../../images/pencil.svg'

export default class Greeting extends React.Component {
  render () {
    return (
      <div className='greetingContainer'>
        <img src={pencilSvg} alt="Pencil image"/>
        <h1>Drawing With Friends</h1>
      </div>
    )
  }
}
