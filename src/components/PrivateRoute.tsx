import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

const PrivateRoute: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [error, setError] = useState<string | null>(null);

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

                setIsAuthenticated(response.status === 200);
            } catch (err) {
                console.error('Authentication check failed:', err);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, [isAuthenticated]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    // if (error) {
    //     return (
    //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             <Alert message="Authentication Error" description={error} type="error" showIcon />
    //         </div>
    //     );
    // }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
