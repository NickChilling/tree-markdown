import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

@withRouter
@inject("store")
@observer
export default class Logout extends Component
{
    // constructor(props) 
    // {
    //     super(props);
    // }
    
    componentDidMount()
    {
        window.localStorage.removeItem("FTTREE-TOKEN");
        this.props.history.replace('/login');
    }

    render()
    {
        const main = <div>Logout</div>;
        return <DocumentTitle title={this.props.store.appname}>{main}</DocumentTitle>;
    }
}