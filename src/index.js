import ReactDom from 'react-dom'
import React from 'react'

import Main from './Main'

const init = () => {
    ReactDom.render(<Main/>, document.getElementById('app'))
}

init()
