import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import './css/Layout.css';
import AppHeader from 'components/Header';
import Sidebar from 'components/Sidebar';

const { Content } = Layout;

interface MainLayoutProps {
    children: ReactNode;
    menu?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Layout className="layout">
            <AppHeader />
            <Layout>
                <Sidebar />
                <Content style={{ marginTop: '60px' }} className="content">
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
