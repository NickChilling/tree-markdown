import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import TurndownServie from 'turndown/lib/turndown.umd.js';
import * as turndownPluginGfm from 'turndown-plugin-gfm';
import { Icon, Button } from '@blueprintjs/core';
const turndownService = new TurndownServie();
turndownService.use(turndownPluginGfm.gfm);

@withRouter
@inject("store")
@observer
export default class PasteIcon extends Component
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
    componentDidMount()
    {
        document.addEventListener('paste', (e) => 
        {
            if(this.props.store.is_editing) return true;
            var clipboardData, pasteData;
            e.stopPropagation();
            e.preventDefault();
            clipboardData = e.clipboardData || window.clipboardData;
            pasteData = clipboardData.getData("text/html");
            this.props.store.set_markdown(turndownService.turndown(pasteData));  // 将html 转换为markdown
            
        })
    }
    render()
    {
        return <div><Button icon="pause" minimal={true} /></div>;
    }
}