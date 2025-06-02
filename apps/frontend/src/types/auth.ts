export type UserRole = 'FREE' | 'PAID' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SignUpDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
} 