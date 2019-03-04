import React from 'react'
import { describe } from 'mocha'
import { expect } from 'chai'
import { configure, shallow } from 'enzyme'
import HelloWorld from '../../src/components/HelloWorld'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('homepage', function () {
  it('renders hello world in h1 tags', function () {
    const wrapper = shallow(<HelloWorld />)
    const helloWorld = <h1>Hello World!</h1>
    expect(wrapper.contains(helloWorld)).to.equal(true)
  })
})
