import React, {useState} from "react";
import AddNode from "./AddNode";
import {Caret, Nested, Node} from "./menuStyle";

const TreeNode = ({path, node, buildTree, handleAdd, handleClick}) => {
    const [showAddChild, setShowAddChild] = useState(false)
    console.log('render node.label: ', node.label)
    const addChild = () => {
        setShowAddChild(!showAddChild)
        console.log('AddChild, showAddChild: %o, node.label: %o', showAddChild, node.label)
    }
    return (
        <Node key={path}>
            <div onClick={addChild}/>
            <div>
                {node.label && node.children
                    ? <Caret onClick={handleClick} expanded={node.expanded}>{node.label}</Caret>
                    : <span>{node.label}</span>}
                {node.children && node.expanded &&
                <>
                    <Nested>{node.children.map((child) => buildTree(child, `${path}.${encodeURI(child.label)}`))}</Nested>
                    {!showAddChild && <AddNode add={handleAdd} type='sibling'/>}
                </>}
                {showAddChild && <AddNode add={handleAdd} type='child'/>}
            </div>
        </Node>
    )
}

export default TreeNode