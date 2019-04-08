import * as React from 'react'
import Greeting from './Greeting.jsx'
import Instructions from './Instructions.jsx'
import AboutUs from './AboutUs.jsx'
import '../../css/Homepage.css'

export default class Homepage extends React.Component {
  render () {
    return (
      <div className='homepageContainer'>
        <Greeting/>
        <Instructions/>
        <AboutUs/>
      </div>
    )
  }
}
