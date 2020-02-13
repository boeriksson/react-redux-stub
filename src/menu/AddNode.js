import styled from "styled-components";
import React, {useEffect, useState} from "react";

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
    const [value, setValue] = useState(false)
    let addInput;

    useEffect(() => {
        if (edit) addInput.focus()
    }, [edit])

    const handleKeyPress = (e) => {
        const key =  e.keyCode || e.which
        if (key === 13) {
            addInput.blur()
            add(value)
        }
    }
    const handleChange = (e) => setValue(e.target.value)

    return edit
        ? <AddEdit><input type="text"
                          ref={(input) => {
                              addInput = input;
                          }}
                          onChange={handleChange}
                          onBlur={e => setEdit(false)}
                          onKeyPress={handleKeyPress}/></AddEdit>
        : <AddSlice onClick={e => setEdit(true)}/>
}

export default AddNode