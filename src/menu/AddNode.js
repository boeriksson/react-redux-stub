import styled, {css}  from "styled-components";
import React, {useEffect, useState, createRef} from "react";

const AddSibling = styled.div`
    height: 5px;
    margin-left: 15px;
    &:hover {
        background-color: green;
        cursor: copy;
    }
`

const AddEdit = styled.div`${({type}) => css`
    margin-left 15px;
    input {
        width: 100%;
    }
    ${type === 'child' && `
        margin-left: 30px;
    `}
`}`

const AddNode = ({add, type}) => {
    const [edit, setEdit] = useState(type === 'child')
    const [value, setValue] = useState(false)
    const addInput = createRef();

    useEffect(() => {
        if (edit) addInput.current.focus()
    }, [edit])

    const handleKeyPress = (e) => {
        const key =  e.keyCode || e.which
        if (key === 13) {
            addInput.current.blur()
            add(value)
        }
    }
    const handleChange = (e) => setValue(e.target.value)
    return edit
        ? <AddEdit type={type}><input type="text"
                          ref={addInput}
                          onChange={handleChange}
                          onBlur={e => setEdit(false)}
                          onKeyPress={handleKeyPress}/></AddEdit>
        : <AddSibling onClick={e => setEdit(true)}/>
}

export default AddNode