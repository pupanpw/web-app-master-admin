import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from 'pages/error/NotFoundPage';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/login/Login';
import MainLayoutRoute from './MainLayoutRoute';

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path="/:menu/*" element={<MainLayoutRoute />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    </Router>
);

export default AppRoutes;
