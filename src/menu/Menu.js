import React, {useState, useEffect} from 'react'

import {Container, TreeTopUL, Nested, Caret} from './menuStyle'
import styled from "styled-components";

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

const AddSlice = styled.div`
    height: 5px;
    margin-left: 15px;
    &:hover {
        background-color: green;
    }
`
const AddEdit = styled.div`
    margin-left 15px;
    input {
        width: 100%;
    }
`

const AddNode = ({add}) => {
    const [edit, setEdit] = useState(false)
    let addInput;

    useEffect(() => {
        if (edit) addInput.focus()
    }, [edit])

    const handleKeyPress = (e) => {
        const key =  e.keyCode || e.which
        if (key === 13) {
            console.log('handleKeyPress addInput.current: ', addInput)
            addInput.blur()
            //add(addInput.current.value)
        }
    }

    return edit
        ? <AddEdit><input type="text"
                          ref={(input) => {
                              addInput = input;
                          }}
                          onBlur={e => setEdit(false)}
                          onKeyPress={handleKeyPress}/></AddEdit>
        : <AddSlice onClick={e => setEdit(true)}/>
}

export default () => {
    const [tree, setTree] = useState(payload)
    const buildTree = (node, path) => {
        const handleClick = () => {
            node.expanded = !node.expanded
            setTree({...tree})
        }
        const handleAdd = (value) => {
            console.log('handleAdd value: ', value)
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