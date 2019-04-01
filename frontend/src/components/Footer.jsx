import React from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends React.Component {
  render () {
    return (
      <footer className="page-footer light-blue">
        <div className="footer-copyright">
          <div className="container">
            <span>© 2019 Drawing with Friends</span>
            <Link className="grey-text text-lighten-4 right" to="/about">About Us</Link>
          </div>
        </div>
      </footer>
    )
  }
}
