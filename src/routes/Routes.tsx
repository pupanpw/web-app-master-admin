import AppLayout from 'components/Layout';
import AboutPage from 'pages/About/AboutPage';
import HomePage from 'pages/home/HomPage';
import NotFoundPage from 'pages/NotFound/NotFoundPage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRoutes: React.FC = () => (
    <Router>
        <AppLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AppLayout>
    </Router>
);

export default AppRoutes;
