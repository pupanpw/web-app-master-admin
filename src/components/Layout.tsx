import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import AppHeader from './Header';
import './css/Layout.css';

const { Content } = Layout;

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Layout className="layout">
            <AppHeader />
            <Layout>
                <Sidebar />
                <Layout>
                    <Content className="content">{children}</Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
