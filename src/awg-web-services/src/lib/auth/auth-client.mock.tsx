import { AuthClient, AuthUser } from './auth-client';

const AUTH_BASE = '/auth';
const APP_BASE = '/app';

export const ServerAuthClient: AuthClient = {
    async login(username, password): Promise<void> {
        try {
            const res = await fetch(`${AUTH_BASE}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!res.ok) throw new Error('Login failed');
        } catch (error) {
            console.error(error);
        }
    },

    async logout() {
        await fetch(`${AUTH_BASE}/logout`, {
            method: 'POST',
            credentials: 'include',
        });
    },

    async getUser(): Promise<AuthUser | null> {
        const res = await fetch(`${APP_BASE}/user`, {
            credentials: 'include',
        });

        if (!res.ok) return null;

        const data = await res.json();
        return {
            id: data.id,
            name: data.name,
            role: data.role,
        };
    },
};
