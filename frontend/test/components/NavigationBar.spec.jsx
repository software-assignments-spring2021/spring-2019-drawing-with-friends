import React from 'react'
import { describe } from 'mocha'
import { expect } from 'chai'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Link } from 'react-router-dom'
import NavigationBar from '../../src/components/NavigationBar'

configure({ adapter: new Adapter() })

describe('NavigationBar', function () {
  it('renders "create room" button', function () {
    const wrapper = shallow(<NavigationBar/>)
    const createRoomButton = <Link to="/create" className="waves-effect waves-light btn">Create Room <i
      className="material-icons right">color_lens</i></Link>
    expect(wrapper.contains(createRoomButton)).to.equal(true)
  })

  it('renders "join random room" button', function () {
    const wrapper = shallow(<NavigationBar/>)
    const joinRandomRoomButton = <Link to="/join" className="waves-effect waves-light btn">Join Room <i
      className="material-icons right">colorize</i></Link>
    expect(wrapper.contains(joinRandomRoomButton)).to.equal(true)
  })
})
