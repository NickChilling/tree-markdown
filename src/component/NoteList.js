import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import NoteListItem  from './NoteListItem';
import { Button } from '@blueprintjs/core';
import { ObjectID} from 'bson';
@withRouter
@inject("store")
@observer
export default class NoteList extends Component
{
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
    
    render()
    {
        return (<div className="notelist">
            <div className = "selected-list">
            {this.props.store.current_note_list.map(
                (item) => <NoteListItem 
                            data={item}
                            key={item._id} />
            ) }
            </div>
            <div className="toolbar"> 
                <Button icon="add" minimal = {true} color="#ca3e47" onClick ={()=>this.props.store.add_note()}></Button>
                <Button icon="delete" minimal ={true} onClick = {() => this.props.store.del_note()}></Button>
            </div>
        </div>)
    }
}