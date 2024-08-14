import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

const PrivateRoute: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) return false;

            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}/auth/refresh-token`, {
                refresh_token: refreshToken,
            });

            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);
            return true;
        } catch (err) {
            return false;
        }
    };

    useEffect(() => {
        const validateToken = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/auth/validate-login`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    const refreshed = await refreshAccessToken();
                    setIsAuthenticated(refreshed);
                }
            } catch (err) {
                console.error('Authentication check failed:', err);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
