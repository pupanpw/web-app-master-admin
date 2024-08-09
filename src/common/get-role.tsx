import { jwtDecode } from 'jwt-decode';

export const getToken = (): string | null => {
    return localStorage.getItem('access_token');
};
interface JwtPayload {
    role: string;
}

export const getRoleFromToken = (token: string | null): string => {
    console.log(token, 'token');
    if (!token) return 'user';

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded, 'decoded');
        return decoded.role || 'user';
    } catch {
        return 'user';
    }
};
