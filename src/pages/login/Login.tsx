import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
            <div className="login-image"></div>
            <div className="login-form-container">
                <div className="login-logo">
                    <img
                        src="https://scontent.fbkk8-4.fna.fbcdn.net/v/t39.30808-6/300587272_463279502481037_5935601926601170095_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6h0RXJsuRPsQ7kNvgGO5cHr&_nc_ht=scontent.fbkk8-4.fna&oh=00_AYBCtSd-V13mVj8jzXlqa0wKOoGJo8hKJ7rFQZHJUZT9Qw&oe=66B7E1DF"
                        alt="Logo"
                    />
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
                        <a className="login-form-forgot" href="#!">
                            Forgot password
                        </a>
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
