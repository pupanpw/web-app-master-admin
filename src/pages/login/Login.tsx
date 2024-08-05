import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const onFinish = async (values: { username: string; password: string }) => {
        try {
            console.log('API URL:', apiUrl);

            const response = await axios.post(`${apiUrl}/auth/login`, {
                username: values.username,
                password: values.password,
            });

            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);

            navigate('/home');

            message.success('Login successful');
        } catch (error) {
            console.error('Login failed:', error);
            message.error('Login failed');
        }
    };

    return (
        <div className="login-container">
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
                    <a className="login-form-forgot" href="#!">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <div className="login-form-register">
                        Or <a href="#!">register now!</a>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
