import React from 'react'
import { Link } from 'react-router-dom'

export default class NavigationBar extends React.Component {
  render () {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper light-blue">
            <Link to="#!" style={{ marginLeft: '20px' }} className="brand-logo">Drawing with Friends</Link>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/game" className="waves-effect waves-light btn">Create Room <i
                className="material-icons right">color_lens</i></Link></li>
              <li><a className="waves-effect waves-light btn">Join Random <i
                className="material-icons right">colorize</i></a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
