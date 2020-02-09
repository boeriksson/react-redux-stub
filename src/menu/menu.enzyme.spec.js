import React from 'react'
import { mount, shallow, render } from 'enzyme'

import Menu from './Menu'

describe('#Menu', () => {
    it('initial test', () => {
        const comp = shallow(<Menu/>)
        expect(comp).toMatchSnapshot()
    })
})