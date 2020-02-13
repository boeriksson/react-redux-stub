import React, {useState, useEffect} from 'react'

import {Container, TreeTopUL, Nested, Caret} from './menuStyle'
import AddNode from './AddNode'

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
        const handleAdd = (value) => {
            node.children.push({
                label: value
            })
            setTree({...tree})
        }
        return <li key={path}>
            {node.label && node.children
                ? <Caret onClick={handleClick} expanded={node.expanded}>{node.label}</Caret>
                : <span>{node.label}</span>}
            {node.children && node.expanded &&
            <>
                <Nested>{node.children.map((child) => buildTree(child, `${path}.${encodeURI(child.label)}`))}</Nested>
                <AddNode add={handleAdd}/>
            </>}
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