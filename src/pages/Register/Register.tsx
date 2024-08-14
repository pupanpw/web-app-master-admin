/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const onFinish = async (values: { username: string; password: string; email: string; firstname: string; lastname: string }) => {
        try {
            const response = await axios.post(`${apiUrl}/v1/register`, {
                user_id: values.username,
                password: values.password,
                first_name: values.firstname,
                last_name: values.lastname,
                email: values.email,
            });
            if (response.status === 201) {
                message.success('Register successful');
                navigate('/login');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            } else {
                message.error('Registration failed');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-image"></div>
            <div className="register-form-container">
                <Form name="register" className="register-form" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="firstname" rules={[{ required: true, message: 'Please input your Firstname!' }]}>
                        <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="Firstname" />
                    </Form.Item>
                    <Form.Item name="lastname" rules={[{ required: true, message: 'Please input your lastname!' }]}>
                        <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="lastname" />
                    </Form.Item>

                    <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid Email!' }]}>
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Passwords do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Confirm Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            Register
                        </Button>
                        <div className="register-form-login">
                            Already have an account?<Link to="/login">Login</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;
