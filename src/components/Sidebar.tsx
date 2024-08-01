import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import './css/Sidebar.css';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    return (
        <Sider
            className={`sidebar ${collapsed ? 'collapsed' : ''}`}
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            theme="light"
            breakpoint="lg"
            collapsedWidth={80}
            width={200}
        >
            <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                    <Link to="/about">About</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
