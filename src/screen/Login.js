import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import{InputGroup, Button, FormGroup} from '@blueprintjs/core';

@withRouter
@inject('store')
@observer
export default class Login extends Component
{
    state ={
        nickname:'',
        password:'',
    };

    async login()
    {
        if(this.state.nickname.length<1 || this.state.password.length<1) return alert("用户名和密码不能为空");
        await this.props.store.login(this.state.nickname, this.state.password);
        this.props.history.push('/editor');
    }
    render()
    {
        const main =  <div className="login-page">
            <div className="container">
                <div className="text-center">
                    <div className='logobox'>
                        <div className="title">方糖知识树</div>
                    </div>
                    <div className='formbox'>
                        <FormGroup lable="用户名">
                            <InputGroup placeholder="输入用户名"
                            large={true} value= {this.state.nickname}
                            onChange={e=>this.setState({'nickname':e.target.value})}
                            />
                        </FormGroup>
                        <FormGroup label="密码">
                            <InputGroup placeholder="请输入密码" 
                            large={true} value={this.state.password}
                            type="password" onChange={e=>this.setState({
                                "password":e.target.value
                            })}
                            />
                        </FormGroup>
                        <div>
                            <Button large={true} 
                            onClick={e=>this.login()}>登入</Button>
                        </div>
                    </div>
                </div>
            
            </div>
                </div>;
        return <DocumentTitle title={this.props.store.appname}>{main}</DocumentTitle>
    }
} 