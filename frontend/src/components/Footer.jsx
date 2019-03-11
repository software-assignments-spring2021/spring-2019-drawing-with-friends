import React from 'react'

export default class Footer extends React.Component {
  render () {
    return (
      <footer className="page-footer light-blue">
        <div className="footer-copyright">
          <div className="container">
            <span>© 2019 Drawing with Friends</span>
            <a className="grey-text text-lighten-4 right" href="#!">About Us</a>
          </div>
        </div>
      </footer>
    )
  }
}
