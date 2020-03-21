import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import {Menu, MenuItem, MenuDivider, ControlGroup, Button,InputGroup} from '@blueprintjs/core';
import {ContextMenuTarget} from "@blueprintjs/core/lib/esnext/components";
import { ObjectID } from 'bson';
@withRouter
@inject("store")
@observer
@ContextMenuTarget
export default class TreeNode extends Component
{
    state = {
        "rename":false,
        "text":"",
    }
    // constructor(props) 
    // {
    //     super(props);
    // }
    
    // componentDidMount()
    // {
    //    // 
    // }

    // componentDidUpdate(prevProps)
    // {
    //     if (this.props.data !== prevProps.data) 
    //     {
           
    //     }
    // }
    async remove()
    {
        if(!window.confirm("确定要删除节点吗？其下的子节点也会被删除")) return false;
        await this.props.store.tree_remove_node(this.props.data._id);
        await this.props.store.update_tree();
    }
    async add()
    {
        const new_node = {
            _id: new ObjectID(),
            module:"未命名",
            children:[],
            collapsed:false,
            created_at: Date.now(),
        };
        if(this.props.data.children)
            this.props.data.children.push(new_node);
        else
            this.props.data.children = [new_node];
        await this.props.store.update_tree();
        if(this.props.onUpdate) this.props.onUpdate();
        
    }
    cancel()
    {
        this.setState({"rename":false, "text":""})
    }
    async save()
    {
        this.props.data.module = this.state.text;
        this.setState({"rename":false, "text":""});
        await this.props.store.update_tree();
    }

    async clicked()
    {
        this.props.store.active_id = this.props.data._id;
        await this.props.store.load_notes(this.props.data._id);
        if( this.props.store.view_type == 1 ) this.props.store.view_type = 2;
    }
    renderContextMenu()
    {
        return (
            <Menu>
                {
                    this.props.data.module != 'root' &&<>
                    <MenuItem icon="text-highlight" onClick={()=>{
                        this.setState({'rename':true, "text":this.props.data.module});
                    }} text = "重命名" />

                    <MenuItem icon="cross" onClick = {()=>this.remove()} text= '删除'></MenuItem>
                    <MenuDivider/>
                    </> }
                    <MenuItem icon="plus" onClick={()=> this.add()} text="新增子节点" />
                
            </Menu>
        )
    }
    render()
    {
        return <div>
            { this.state.rename?
            <ControlGroup fill={true} vertical = {false}>
                <InputGroup placeholder="新名字" value = {this.state.text} small = {true} 
                        onChange={(e)=> this.setState({"text":e.target.value})} 
                        onKeyDown={(e)=>{if(e.keyCode===13) this.save()}} 
                        />
                <Button icon = "small-tick" small = {true} 
                        onClick={()=>this.save()} minimal={true}
                     />
            </ControlGroup>
            :
                ((this.props.store.active_id == this.props.data._id) ? 
                    <span className='is-active' onClick={()=> this.clicked()}>{this.props.data.module}</span>
                    :
                    <span onClick={()=>this.clicked()}>{this.props.data.module}</span>)}
            </div>;
    }
}