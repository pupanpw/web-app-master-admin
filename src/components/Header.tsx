import React from 'react';
import { Layout, Button } from 'antd';
import './css/Header.css';

const { Header } = Layout;

const AppHeader: React.FC = () => {
    const handleLogout = () => {
        console.log('Logout clicked');
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
