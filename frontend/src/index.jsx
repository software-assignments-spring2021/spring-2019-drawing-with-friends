import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import JoinPage from './components/JoinGamePage.jsx'
import CreatePage from './components/CreateGamePage.jsx'
import Homepage from './components/Homepage/Homepage.jsx'

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <NavigationBar/>

        <Switch>
          <Route path='/create' component={CreatePage}/>
          <Route path='/join' component={JoinPage}/>
          <Route path='/' component={Homepage}/>
        </Switch>

        <Footer/>
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <HashRouter>
    <App/>
  </HashRouter>,
  document.getElementById('root')
)
