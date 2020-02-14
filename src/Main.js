import React from 'react'
import styled from '@emotion/styled'

import TopBar from './topbar/TopBar'
import Menu from './menu/Menu'

const MainContainer = styled.div`
    height: 100%;
`

const Mid = styled.div`
    display: flex;
    height: 100%;
`

const Work = styled.div`
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 100%;
    height: 100%;
`

export default () => (
    <MainContainer>
        <TopBar/>
        <Mid>
            <Menu/>
            <Work>
                Workarea
            </Work>
        </Mid>
    </MainContainer>
)
