import React from 'react';
import { Row, Col, Card } from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import { mockData } from './mock/mockData';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Homepage.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const HomePage: React.FC = () => {
    const lineData = {
        labels: mockData.map((entry) => new Date(entry.timestamp).toLocaleString()),
        datasets: [
            {
                label: 'Humidity (%)',
                data: mockData.map((entry) => entry.humidity),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointBorderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Humidity Levels Over Time',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Timestamp',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Humidity (%)',
                },
                min: 0,
                max: 100,
            },
        },
    };

    const barData = {
        labels: mockData.map((entry) => new Date(entry.timestamp).toLocaleString()),
        datasets: [
            {
                label: 'humidity (%)',
                data: mockData.map((entry) => entry.humidity),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Temperature Levels Over Time',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Timestamp',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                },
                min: 0,
            },
        },
    };

    return (
        <div className="full-page">
            <Row gutter={24} className="row">
                <Col xs={12}>
                    <Card title="Humidity Data" bordered={false} className="card">
                        <Line data={lineData} options={lineOptions} />
                    </Card>
                </Col>
                <Col xs={12}>
                    <Card title="Temperature Data" bordered={false} className="card">
                        <Bar data={barData} options={barOptions} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={24} className="row">
                <Col xs={12}>
                    <Card title="Humidity Data" bordered={false} className="card">
                        <Line data={lineData} options={lineOptions} />
                    </Card>
                </Col>
                <Col xs={12}>
                    <Card title="Temperature Data" bordered={false} className="card">
                        <Bar data={barData} options={barOptions} />
                    </Card>
                </Col>
                <Col xs={12}>
                    <div></div>
                </Col>
            </Row>
            <br />
            <br />
            <br />
        </div>
    );
};

export default HomePage;
