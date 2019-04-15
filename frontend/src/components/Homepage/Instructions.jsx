import * as React from 'react'
import '../../css/Instructions.css'
import instructionsLogo from '../../images/InstructionsLogo.svg'
import twoPencilsLogo from '../../images/PencilsIcon.svg'

export default class Instructions extends React.Component {
  render () {
    return (
      <div className='instructionsContainer'>
        <div className='instructionsTitle'>
          <h2>INSTRUCTIONS</h2>
        </div>

        <div className='instructionsDescription'>
          <div className='gettingStarted'>
            <h3>Getting Started</h3>
            <img src={instructionsLogo} alt='Instructions icon' className='formatImages'/>
            <p>{`"Create a Room"`} allows you to start a game and gives you a code that you send to your friends to get them to join your session. Up to 4 players (including yourself) can join one session. </p>
            <p>{`"Join a Room"`} allows you to enter a code to join a session.</p>
          </div>

          <div className='howToPlay'>
            <h3>How to Play</h3>
            <img src={twoPencilsLogo} alt='Two pencils icon' className='formatImages'/>
            <ul>
              <li>One player is selected to draw a randomly given word- a color palette and different tools are available to the player drawing</li>
              <li>All other players must guess what the picture is</li>
              <li>Each round lasts for 1 minute, and each user gets 2 turns</li>
              <li>The faster you guess the correct answer, the more points you earn</li>
              <li>Once everyone has had 2 turns, the game is over and whoever has the highest score wins</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
