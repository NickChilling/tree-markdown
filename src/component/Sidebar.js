import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Tree from 'react-ui-sortable-tree';
import TreeNode from './TreeNode';
import 'react-ui-sortable-tree/dist/react-ui-tree.css';
import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
@withRouter
@inject("store")
@observer
export default class Sidebar extends Component {
    // constructor(props) 
    // {
    //     super(props);
    // }

    componentDidMount() {
        this.props.store.init_tree();
    }

    // componentDidUpdate(prevProps)
    // {
    //     if (this.props.data !== prevProps.data) 
    //     {

    //     }
    // }
    add() {
        this.props.store.tree_add_node();
        this.forceUpdate();
    }
    render() {
        return (
            <div className="sidebar">
                <div className="m-tree-container">
                    <Tree
                        renderNode={node => <TreeNode data={node}
                            onUpdate={() => this.forceUpdate()}
                            className="tree-node"
                        />}
                        tree={this.props.store.current_tree}
                        onChange={tree => this.props.store.update_tree(tree)} />
                </div>
                <div className="toolbar">
                    <ControlGroup fill={false} vertical={false}>
                        <InputGroup placeholder="搜索" fill={false} 
                            small={true} leftIcon="search"
                            onChange= {(e)=>{this.props.store.search(e.target.value)}}
                            type="search"/>
                    </ControlGroup>
                    <Button icon="plus" minimal={true} onClick={
                        () => this.add()} />
                </div>
            </div>
        )
    }
}