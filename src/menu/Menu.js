import React, {useState} from 'react'
import styled, {css} from 'styled-components'

const Container = styled.div`
    background-color: yellow;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;

    height: 100%;
`

const TreeTopUL = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

const Nested = styled.ul`
    list-style-type: none;
    display: block;
`

const Caret = styled.span`${({expanded}) => css`
    cursor: pointer;
    user-select: none;
    
    &::before {
        content: "\\25B6";
        color: black;
        display: inline-block;
        margin-right: 6px;
    }
    ${ expanded && `
        &::before {
            transform: rotate(90deg);
        }
    `}
`}`

const payload = [
    {
        label: "lövträd",
        expanded: true,
        children: [
            {
                label: "björk",
                expanded: false,
                children: [
                    {
                        label: "skogsbjörk"
                    },
                    {
                        label: "hängbjörk"
                    }
                ]
            },
            {
                label: "ek",
                expanded: true,
                children: [
                    {
                        label: "skogsek"
                    },
                    {
                        label: "rödek"
                    },
                    {
                        label: "korkek"
                    }
                ]
            }
        ]
    },
    {
        label: "barrträd",
        expanded: false,
        children: [
            {
                label: "tall"
            },
            {
                label: "gran"
            }
        ]
    }
]


export default () => {
    const [tree, setTree] = useState(payload)
    const buildTree = (node, path) => {
        const handleClick = () => {
            node.expanded = !node.expanded
            setTree({...tree})
        }
        return <li key={path}>
            {node.label && node.children
                ? <Caret onClick={handleClick} expanded={node.expanded}>{node.label}</Caret>
                : <span>{node.label}</span>}
            {node.children && node.expanded &&
                <Nested>{node.children.map((child) => buildTree(child, `${path}.${encodeURI(child.label)}`))}</Nested>}
        </li>
    }

    return (
        <Container>
            <TreeTopUL>
                {buildTree({children: payload, expanded: true}, 'root')}
            </TreeTopUL>
        </Container>
    )
}