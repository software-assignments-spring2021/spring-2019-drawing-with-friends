import React from 'react'
import { describe } from 'mocha'
import { expect } from 'chai'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AboutUs from '../../src/routes/AboutUs'

configure({ adapter: new Adapter() })

describe('About Us page', function () {
  it('should do something', function () {
    const wrapper = shallow(<AboutUs/>)
  })

  it('should do something else', function () {
    const wrapper = shallow(<AboutUs/>)
  })
})
