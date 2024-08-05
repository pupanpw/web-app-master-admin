import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import MainLayout from '../components/Layout';
import routes from './configRoutes';
import NotFoundPage from 'pages/error/NotFoundPage';

const MainLayoutRoute: React.FC = () => {
    const { menu } = useParams<{ menu: string }>();

    const currentRoute = routes.find((route) => route.path === `/${menu}`) || routes.find((route) => route.path === '*');

    return (
        <MainLayout menu={menu}>
            {currentRoute?.element || <NotFoundPage />}
            <Outlet />
        </MainLayout>
    );
};

export default MainLayoutRoute;
