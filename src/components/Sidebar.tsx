import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import './css/Sidebar.css';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState<string>('');

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        setSelectedKey(path || 'home');
    }, [location.pathname]);

    const onMenuClick = (key: string) => {
        setSelectedKey(key);
        navigate(`/${key}`);
    };

    const items = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: 'Home',
        },
        {
            key: 'about',
            icon: <InfoCircleOutlined />,
            label: 'About',
        },
        {
            key: 'users',
            icon: <UserOutlined />,
            label: 'Users',
        },
    ];

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
            <Menu mode="inline" selectedKeys={[selectedKey]} onClick={({ key }) => onMenuClick(key)} items={items} />
        </Sider>
    );
};

export default Sidebar;
