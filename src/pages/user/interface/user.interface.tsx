export interface User {
    id: number;
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    active_flag: string;
}
export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

export const Role = {
    User: 'user',
    Admin: 'admin',
    MasterAdmin: 'master_admin',
};
