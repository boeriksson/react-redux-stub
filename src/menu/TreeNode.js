import React, {useState} from "react";
import AddNode from "./AddNode";
import {Caret, Container, Nested, Node} from "./menuStyle";

const TreeNode = ({node, buildTree, handleAdd, handleClick}) => {
    const [showAddChild, setShowAddChild] = useState(false)
    const addChild = () => setShowAddChild(!showAddChild)
    return (
        <Node selected={node.selected}>
            <div onClick={addChild}/>
            <div>
                <div onClick={handleClick}>
                    {node.label && node.children
                        ? <Caret data-tooltip="tooltipCaret"
                                 expanded={node.expanded}>{node.label}</Caret>
                        : <span data-tooltip="tooltip">{node.label}</span>}
                </div>
                {node.children && node.expanded &&
                <>
                    <Nested>{node.children.map((child) => buildTree(child))}</Nested>
                    {!showAddChild && <AddNode add={handleAdd} type='sibling'/>}
                </>}
                {showAddChild && <AddNode add={handleAdd} type='child'/>}
            </div>
        </Node>
    )
}

export default TreeNode