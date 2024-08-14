/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Input, Tag, Modal, Form, Select, notification } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axiosInstance from 'guard/axiosInstance';
import { debounce } from 'lodash';
import { User, formItemLayout, Role } from './interface/user.interface';
import './User.css';
import { AxiosErrorResponse } from 'pages/login/interface/AxiosErrorResponse';

const Users: React.FC = () => {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingModal, setLoadingModal] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [form] = Form.useForm();

    const getUsers = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axiosInstance.get('/v1/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    limit: pagination.pageSize,
                    offset: (pagination.current - 1) * pagination.pageSize,
                    search: searchTerm,
                },
            });
            setData(response.data.data);
            setPagination((prev) => ({
                ...prev,
                total: response.data.total,
            }));
        } catch (error) {
            notification.error({
                message: 'Failed to Fetch Users',
                description: 'An error occurred while fetching users. Please try again later.',
                placement: 'topRight',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, [pagination.current, pagination.pageSize, searchTerm]);

    const updateUser = async (user: User) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axiosInstance.patch(`/v1/users/${user.id}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                notification.success({
                    message: 'Update User Successfully',
                    placement: 'topRight',
                });
                getUsers();
                setLoadingModal(false);
            }
        } catch (error) {
            setLoadingModal(false);
            const err = error as AxiosErrorResponse;

            if (err.response?.data?.statusCode === 400) {
                notification.error({
                    message: err.response?.data.message,
                    description: err.response?.data.error,
                    placement: 'topRight',
                });
            } else {
                notification.error({
                    message: 'Failed to Update User',
                    description: 'An error occurred while updating the user. Please try again later.',
                    placement: 'topRight',
                });
            }
        }
    };

    const handleTableChange = (pagination: any) => {
        setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
        });
    };

    const debouncedSearch = debounce((value: string) => {
        setSearchTerm(value);
        setPagination((prev) => ({
            ...prev,
            current: 1,
        }));
    }, 1500);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    const handleEdit = (user: User) => {
        form.setFieldsValue({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        });
        setOpen(true);
    };

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                const user: User = {
                    ...values,
                    id: form.getFieldValue('id'),
                };
                updateUser(user);
                setLoadingModal(true);
                setOpen(false);
            })
            .catch(function () {
                notification.error({
                    message: 'Validation Failed',
                    description: 'Please correct the errors in the form before submitting.',
                    placement: 'topRight',
                });
            });
    };

    const handleCancel = () => {
        form.resetFields();
        form.setFields([]);
        setOpen(false);
    };

    const handleFormChange = () => {
        const fields = form.getFieldsError();
        const isValid = fields.every((field) => !field.errors.length);
        setIsSubmitDisabled(!isValid);
    };

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email: string) => (email !== '' ? email : '-'),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => (
                <Tag color={role === 'admin' ? 'green' : role === 'master_admin' ? 'blue' : 'default'}>
                    {role === 'master_admin' ? 'Master Admin' : role}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            width: '80px',
            key: 'actions',
            render: (_: any, record: User) => <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>,
        },
    ];

    return (
        <div className="users-container">
            <br />
            <Row gutter={16} justify="space-between">
                <Col xs={23}>
                    <Input placeholder="Search users" onChange={handleSearchChange} style={{ marginBottom: 5 }} />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: pagination.total,
                        }}
                        onChange={handleTableChange}
                        size="middle"
                        scroll={{ x: 'max-content', y: 400 }}
                        loading={loading}
                    />
                </Col>
            </Row>
            <Modal
                title="Edit User"
                open={open}
                okText="Update"
                onOk={handleSubmit}
                confirmLoading={loadingModal}
                onCancel={handleCancel}
                okButtonProps={{ disabled: isSubmitDisabled }}
            >
                <Form form={form} {...formItemLayout} style={{ maxWidth: 600 }} onValuesChange={handleFormChange}>
                    <Form.Item label="ID" name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please input first name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please input last name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input email!' },
                            { type: 'email', message: 'The input is not a valid email!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select a role!' }]}>
                        <Select>
                            <Select.Option value={Role.User}>User</Select.Option>
                            <Select.Option value={Role.Admin}>Admin</Select.Option>
                            <Select.Option value={Role.MasterAdmin}>Master Admin</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Users;
