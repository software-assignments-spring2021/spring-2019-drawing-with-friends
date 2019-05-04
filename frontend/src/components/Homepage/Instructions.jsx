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
            <p>{`"Create a Room"`} allows you to start a game and gives you a code that you send to your friends to
              get them to join your session. You will need at least 3 players to play</p>
            <p>{`"Join a Room"`} allows you to enter a code to join a session.</p>
          </div>

          <div className='howToPlay'>
            <h3>How to Play</h3>
            <img src={twoPencilsLogo} alt='Two pencils icon' className='formatImages'/>
            <ul>
              <li>One player is selected be the artist and assign to draw a random word</li>
              <li>Other players in the game must guess what the drawing is by typing guesses into chat</li>
              <li>If you guess correctly, your guess will be censored in the chat so other players are not given
                the answer. You will get points for guessing correctly</li>
              <li>The faster you guess the correct answer, the more points you earn</li>
              <li>The artist will receive 100 points for each person that correctly guesses their drawing</li>
              <li>Each round lasts for 1 minute, and each user gets 2 or 3 turns to draw depending on the
                number of people in the game</li>
              <li>The game is over when everyone takes their turns and whoever has the highest score wins</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
