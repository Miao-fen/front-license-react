import React, { Component } from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import './login.css'

class demo extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false
        }
    }
    handleLogin = () => {
        const { validateFields } = this.props.form;
        validateFields(['username', 'password'], (err, values) => {
            if (!err) {
                if (values.username !== "" && values.password !== "") {
                    axios.post("/jkz/login/userLogin", qs.stringify({
                        username: values.username,
                        password: values.password
                    })).then((res) => {
                        console.log(res)
                        let data = res.data
                        if (data.respCode === "1000000") {
                            this.historyPush('/list', values.username);
                            sessionStorage.setItem("username", values.username);
                            sessionStorage.setItem("token", data.token);
                        } else {
                            this.setState({
                                isShow: true
                            })
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            } else {
                message.error('账号密码输入有误，请检查。')
            }
        })
    }
    historyPush = (pathname, username) => {
        this.props.history.push({
            pathname: pathname
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='App App-header'>
                <div className="wrapBox">
                    <p className="p1">食品安全</p>
                    <p className="p2">职业技能证书</p>
                    <Form className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator("username", {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: '用户名不能为空' },
                                        { max: 20, message: '用户名不能超过20个字符' },
                                    ]
                                })(
                                    <Input placeholder="请输入用户名" autoComplete="off" suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} style={{ marginTop: 20, width: 350 }} />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password", {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: '密码不能为空' },
                                        { max: 8, message: '密码不能超过8个字符' },
                                        { pattern: /^\d{6,8}$/, message: '请输入6到8位由数字、字母组合的密码' }
                                    ]
                                })(
                                    <Input.Password placeholder="请输入密码" autoComplete="off" style={{ width: 350 }} />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' block style={{ marginTop: 20 }} onClick={this.handleLogin}>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
                <p className="foot">智锐达认证 · 权威发布</p>
            </div>
        )
    }
}
export default Form.create()(demo)
