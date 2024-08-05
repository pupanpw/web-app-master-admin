import Home from 'pages/home/HomePage';
import AboutPage from 'pages/About/AboutPage';
import NotFoundPage from 'pages/error/NotFoundPage';

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
        path: '*',
        element: <NotFoundPage />,
    },
];

export default routes;
