import React from 'react'

export default class NavigationBar extends React.Component {
  render () {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper light-blue">
            <a href="#!" style={{ marginLeft: '20px' }} className="brand-logo">Drawing with Friends</a>
            <ul className="right hide-on-med-and-down">
              <li><a className="waves-effect waves-light btn">Create Room <i
                className="material-icons right">color_lens</i></a></li>
              <li><a className="waves-effect waves-light btn">Join Random <i
                className="material-icons right">colorize</i></a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
