import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, message, Tooltip } from 'antd';
import { UserOutlined, LockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const onFinish = async (values: { username: string; password: string }) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                username: values.username,
                password: values.password,
            });

            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);

            navigate('/home');
            message.success('Login successful');
        } catch (error) {
            const err = error as AxiosErrorResponse;
            message.error('Login failed: ' + (err.response?.data?.message || 'Internal Server Error'));
        }
    };

    useEffect(() => {
        console.log('login');
    }, []);

    return (
        <div className="login-container">
            <div className="login-image"></div>
            <div className="login-form-container">
                <div className="login-logo">
                    <img src="http://pupanpw.thddns.net:3322/pupan/img/logo-pw.png" alt="Logo" />
                </div>
                <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Tooltip title="Click here to reset your password if you forgot it">
                            <a className="login-form-forgot" href="#!">
                                Forgot password
                                <QuestionCircleOutlined style={{ marginLeft: 8 }} />
                            </a>
                        </Tooltip>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <div className="login-form-register">
                            Or <Link to="/register">register now!</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
