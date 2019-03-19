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
    const drawingWithFriendsParagraph = <p>Drawing With Friends, headquartered in New York, New York, focuses on
            providing
            entertaining while
            simultaneously
            challenging the creative mind. By offering a safe haven to interact with friends, tools
            for the
            imagination to
            run wild, and challenges that test knowledge, Drawing With Friends offers a quality
            solution for
            entertainment
            and socialization.</p>
    expect(wrapper.contains(drawingWithFriendsParagraph)).to.equal(true)
  })

  it('includes a link to the game', function () {
    const wrapper = shallow(<AboutUs/>)
    const drawingWithFriendsParagraph = <p>Drawing With Friends was founded in the February of 2019 by a professor
            of Computer
            Science. The
            resulting
            combination brought together a bunch of innovative minds with years of experience in the
            field of
            Computer
            Science, forming the best source of entertaining on the web.</p>
    expect(wrapper.contains(drawingWithFriendsParagraph)).to.equal(true)
  })
})
