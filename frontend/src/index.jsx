import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import NavigationBar from './components/NavigationBar.jsx'
// import GamePage from './components/GamePage.jsx'
import JoinPage from './components/JoinGamePage.jsx'
import Homepage from './components/Homepage/Homepage.jsx'

// <Route path="/game" component={GamePage}/>
class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <NavigationBar/>

        <Switch>
          <Route path="/game" component={JoinPage}/>
          <Route path="/" component={Homepage}/>
        </Switch>

        <Footer/>
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
)
