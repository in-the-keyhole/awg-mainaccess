export type AuthUser = {
    id: string;
    name: string;
    role: string;
};

export interface AuthClient {
    getUser(): Promise<AuthUser | null>;
    login(username: string, password: string): Promise<void>;
    logout(): Promise<void>;
}
