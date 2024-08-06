import React from 'react';
import { Row, Col, Card, Table } from 'antd';
import { mockData } from './mock/mockData';

const columns = [
    {
        title: 'Sensor ID',
        dataIndex: 'sensorId',
        key: 'sensorId',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Humidity (%)',
        dataIndex: 'humidity',
        key: 'humidity',
    },
    {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: (text: string) => new Date(text).toLocaleString(),
    },
];

const HomePage: React.FC = () => (
    <div className="full-page">
        <Row gutter={24} className="row">
            <Col xs={24}>
                <Card title="Sensor Data" bordered={false} className="card">
                    <Table
                        columns={columns}
                        dataSource={mockData}
                        pagination={false}
                        bordered
                        scroll={{ x: 'max-content' }}
                        className="table"
                    />
                </Card>
            </Col>
        </Row>
    </div>
);

export default HomePage;
