import React, {useState, useEffect} from 'react'

import {Container, TreeTopUL} from './menuStyle'
import TreeNode from './TreeNode'

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
        const handleAdd = (value, type) => {
            if (!node.hasOwnProperty('children'))
                node.children = []
            node.children.push({
                label: value
            })
            node.expanded = true
            setTree({...tree})
        }
        return <TreeNode
            path={path}
            node={node}
            buildTree={buildTree}
            handleAdd={handleAdd}
            handleClick={handleClick}/>
    }

    return (
        <Container>
            <TreeTopUL>
                {buildTree({children: payload, expanded: true}, 'root')}
            </TreeTopUL>
        </Container>
    )
}