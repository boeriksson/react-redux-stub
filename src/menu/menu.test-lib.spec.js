import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent, screen} from '@testing-library/react'

import Menu from './Menu'

describe('#Menu2', () => {
    it('initial test2', () => {
        render(<Menu/>)

        expect(screen.getByText('Menu')).toBeInTheDocument()
    })
})