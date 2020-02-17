import React, {createRef, useState} from 'react'

import {Container, TreeTopUL} from './menuStyle'
import TreeNode from './TreeNode'

const payload = [
    {
        label: "lövträd",
        expanded: true,
        children: [
            {
                id: 1,
                label: "björk",
                expanded: false,
                children: [
                    {
                        id:2,
                        label: "skogsbjörk"
                    },
                    {
                        id: 3,
                        label: "hängbjörk"
                    }
                ]
            },
            {
                id: 4,
                label: "ek",
                expanded: true,
                children: [
                    {
                        id: 5,
                        label: "skogsek"
                    },
                    {
                        id: 6,
                        label: "rödek"
                    },
                    {
                        id: 7,
                        label: "korkek"
                    }
                ]
            }
        ]
    },
    {
        id: 8,
        label: "barrträd",
        expanded: false,
        children: [
            {
                id: 9,
                label: "tall"
            },
            {
                id: 10,
                label: "gran"
            }
        ]
    }
]

function unSelectTree(tree) {
    tree.map(node => {
        if (node.children) unSelectTree(node.children)
        if (node.selected) delete(node.selected)
    })
}

function flattenTree(tree) {
    const flattenBranch = (branch, flatTree, level) => {
        level++
        branch.map(node => {
            node.level = level
            flatTree.push(node)
            if (node.children && node.expanded) {
                flattenBranch(node.children, flatTree, level)
            }
        })
        return flatTree
    }
    return flattenBranch(tree, [], 0)
}

function deSelectNode(tree) {
    flattenTree(tree).forEach(node => {
        if (node.selected) {
            node.selected = false
        }
    })
}

const getIxOfNode = (flatTree, node) => flatTree.findIndex(nodeComp => node === nodeComp)

function findParent(tree, node) {
    const flatTree = flattenTree(tree)
    let ix = getIxOfNode(flatTree, node)
    const level = flatTree[ix].level
    if (level > 0) {
        flatTree[ix].selected = false
        while (flatTree[ix].level >= level) {
            ix--
        }
        return flatTree[ix]
    }
    return null
}

export default () => {
    let nodeIx = 0
    const [tree, setTree] = useState(payload)
    const containerRef = createRef()
    const handleKeyPress = (e) => {
        const key =  e.keyCode || e.which

        const flatTree = flattenTree(tree)
        let ix = flatTree.findIndex(node => node.selected)
        if (ix < 0) ix = 0

        const hasChildren = flatTree[ix].children && flatTree[ix].children.length > 0;
        const editKey = e.altKey || e.ctrlKey;

        switch (key) {
            case 13:    // 13: enter - ladda content
                break
            case 32:    // 32: mellanslag  - toggle expanded
                if (hasChildren) {
                    flatTree[ix].expanded = !flatTree[ix].expanded
                }
                break
            case 37:    // 37: vänster - parent
                        //             - if parent is root, nop
                const level = flatTree[ix].level
                if (level > 0) {
                    flatTree[ix].selected = false
                    while (flatTree[ix].level >= level) {
                        flatTree[ix].expanded = false
                        ix--
                    }
                    flatTree[ix].expanded = false
                    flatTree[ix].selected = true
                    e.preventDefault()
                }
                break
            case 38:    // 38: upp      - previos sibling
                        //              - if first child, parent
                        //              - if parent is root, select last child of root
                flatTree[ix].selected = false
                if (ix > 0) {
                    flatTree[ix - 1].selected = true
                } else {
                    flatTree[flatTree.length - 1].selected = true
                }
                e.preventDefault()
                break
            case 39:    // 39: höger   - if children, select first child
                if (editKey && !hasChildren) {
                    flatTree[ix].addChild = true
                }
                if (hasChildren) {
                    flatTree[ix].selected = false
                    flatTree[ix].expanded = true
                    flatTree[ix].children[0].selected = true
                }
                e.preventDefault()
                break
            case 9:     // 9: tab  - same as ner
            case 40:    // 40: ner     - next sibling
                        //             - if last, parents next sibling
                        //             - if root and bottom, select first child of root
                flatTree[ix].selected = false
                if (editKey) {
                    flatTree[ix].addSibling = true
                } else if (ix + 1 < flatTree.length) {
                    flatTree[ix + 1].selected = true
                } else {
                    flatTree[0].selected = true
                }
                e.preventDefault()
                break
            default:
        }
        setTree([...tree])
    }

    function handleAddChild(node, value, type) {
        if (type === 'child' && !node.hasOwnProperty('children')) node.children = []
        let addArray
        deSelectNode(tree)
        node.addSibling && delete node.addSibling
        node.addChild && delete node.addChild
        if (type = 'sibling') {
            const parent = findParent(tree, node)
            addArray = parent ? parent.children : tree
        } else {
            addArray = node.children
        }
        addArray.push({
            id: new Date().getTime(),
            label: value,
            selected: true
        })
        node.expanded = true
        setTree([...tree])
        containerRef.current.focus()
        console.log('handleAddChild')
    }

    const buildTree = (node) => {
        const handleClick = () => {
            if (node.children) node.expanded = !node.expanded
            unSelectTree(tree)
            node.selected = true
            setTree([...tree])
        }
        const handleAdd = (value, type) => {
            handleAddChild(node, value, type);
        }
        return <TreeNode
            key={nodeIx++}
            node={node}
            buildTree={buildTree}
            handleAdd={handleAdd}
            handleClick={handleClick}
        />
    }

    return (
        <Container tabIndex={-1} onKeyDown={handleKeyPress} ref={containerRef}>
            <TreeTopUL>
                {buildTree({children: payload, expanded: true}, 'root')}
            </TreeTopUL>
        </Container>
    )
}