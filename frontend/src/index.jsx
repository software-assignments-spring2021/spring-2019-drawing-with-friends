import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HelloWorld from './components/HelloWorld.jsx'
import Footer from './components/Footer.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import Canvas from './components/Canvas/CanvasWrapper.jsx'
import AboutUs from './components/AboutUs.jsx'

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <NavigationBar/>

        <Switch>
          <Route path="/game" component={Canvas}/>
          <Route path="/about" component={AboutUs}/>
          <Route path="/" component={HelloWorld}/>
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
