import React from 'react'
import { describe } from 'mocha'
import { expect } from 'chai'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AboutUs from '../../src/routes/AboutUs'

configure({ adapter: new Adapter() })

describe('About Us page', function () {
  it('renders title in h1 tags', function () {
    const wrapper = shallow(<AboutUs/>)
    const aboutUs = <h1>About Us!</h1>
    expect(wrapper.contains(aboutUs)).to.equal(true)
  })

  it('includes a link to the game', function () {
    const wrapper = shallow(<AboutUs/>)
    const drawingWithFriendsLink = <a className="grey-text text-lighten-4 right" href="#!">Drawing With Friends</a>
    expect(wrapper.contains(drawingWithFriendsLink)).to.equal(true)
  })
})
