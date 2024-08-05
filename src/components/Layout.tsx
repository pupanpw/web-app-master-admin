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

const MainLayout: React.FC<MainLayoutProps> = ({ children, menu }) => {
    return (
        <Layout className="layout">
            <AppHeader />
            <Layout>
                <Sidebar />
                <Layout>
                    <Content style={{ marginTop: '50px' }} className="content">
                        <div>Menu: {menu}</div>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
