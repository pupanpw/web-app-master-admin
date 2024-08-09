import Home from 'pages/home/HomePage';
import AboutPage from 'pages/About/AboutPage';
import NotFoundPage from 'pages/error/NotFoundPage';
import Users from 'pages/User/User';

const routes = [
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/about',
        element: <AboutPage />,
    },
    {
        path: '/users',
        element: <Users />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

export default routes;
