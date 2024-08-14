import { jwtDecode } from 'jwt-decode';

export const getToken = (): string | null => {
    return localStorage.getItem('access_token');
};
interface JwtPayload {
    role: string;
}

export const getRoleFromToken = (token: string | null): string => {
    if (!token) return 'user';

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.role || 'user';
    } catch {
        return 'user';
    }
};
