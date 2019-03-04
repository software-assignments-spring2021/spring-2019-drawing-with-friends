import React from 'react'
import { describe } from 'mocha'
import { expect } from 'chai'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationBar from '../../src/components/NavigationBar'

configure({ adapter: new Adapter() })

describe('NavigationBar', function () {
  it('renders homepage logo', function () {
    const wrapper = shallow(<NavigationBar />)
    const homepageLogo = <a href="#!" style="margin-left: 20px" className="brand-logo">Drawing with Friends</a>
    expect(wrapper.contains(homepageLogo)).to.equal(true)
  })

  it('renders "create room" button', function () {
    const wrapper = shallow(<NavigationBar />)
    const createRoomButton = <a className="waves-effect waves-light btn">Create Room <i className="material-icons right">color_lens</i></a>
    expect(wrapper.contains(createRoomButton)).to.equal(true)
  })

  it('renders "join random room" button', function () {
    const wrapper = shallow(<NavigationBar />)
    const joinRandomRoomButton = <a className="waves-effect waves-light btn">Join Random <i className="material-icons right">colorize</i></a>
    expect(wrapper.contains(joinRandomRoomButton)).to.equal(true)
  })
})
