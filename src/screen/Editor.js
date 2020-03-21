import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Sidebar from '../component/Sidebar';
import NoteList from '../component/NoteList';
import NotePage from '../component/NotePage';
import NavBar from '../component/NavBar';

@withRouter
@inject("store")
@observer
export default class Editor extends Component
{
    // constructor(props) 
    // {
    //     super(props);
    // }
    
    componentDidMount()
    {
       if(window.innerWidth <=800)
       {
           this.props.store.view_type = 1;
       } 
    }

    render()
    {
        const main = <><NavBar/><div className="editorbox">
                        {(this.props.store.view_type==0 || this.props.store.view_type==1 )&&<Sidebar></Sidebar>}
                        {(this.props.store.view_type==0 || this.props.store.view_type==2) &&<NoteList></NoteList>}
    {(this.props.store.view_type==0 || this.props.store.view_type==3) &&<NotePage></NotePage>}        
                    </div></>;
        return <DocumentTitle title={this.props.store.appname}>{main}</DocumentTitle>;
    }
}