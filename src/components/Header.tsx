import React from 'react';
import { Layout, Button, Modal, message } from 'antd';
import './css/Header.css';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { AxiosErrorResponse } from 'pages/login/interface/AxiosErrorResponse';
import axios from 'axios';

const { Header } = Layout;

const AppHeader: React.FC = () => {
    const navigate = useNavigate();
    const { confirm } = Modal;
    const apiUrl = process.env.REACT_APP_API_URL;

    const logout = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.get(`${apiUrl}/auth/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/login');
            }
        } catch (error) {
            const err = error as AxiosErrorResponse;
            message.error('Logout failed: ' + (err.response?.data?.message || 'Internal Server Error'));
        }
    };
    const handleLogout = async () => {
        confirm({
            title: 'Are you sure you want to logout?',
            icon: <ExclamationCircleFilled />,
            content: '',
            async onOk() {
                await logout();
            },
        });
    };

    return (
        <Header className="header">
            <div className="logo-container">
                <img src="http://pupanpw.thddns.net:3322/pupan/img/logo-pw.png" alt="Logo" className="logo" />
            </div>
            <div className="header-content">
                <Button type="primary" onClick={handleLogout} className="logout-button">
                    Logout
                </Button>
            </div>
        </Header>
    );
};

export default AppHeader;
