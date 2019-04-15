import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import GamePage from './components/GamePage.jsx'
import Homepage from './components/Homepage/Homepage.jsx'

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <NavigationBar/>

        <Switch>
          <Route path="/game" component={GamePage}/>
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
