import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/axios';
import type { AuthResponse, SignInDto, SignUpDto } from '../types/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signUp = useMutation({
    mutationFn: async (data: SignUpDto) => {
      const response = await apiClient.post<AuthResponse>('/auth/signup', data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard');
    },
  });

  const signIn = useMutation({
    mutationFn: async (data: SignInDto) => {
      const response = await apiClient.post<AuthResponse>('/auth/signin', data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard');
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      queryClient.setQueryData(['user'], null);
      navigate('/signin');
    },
  });

  return {
    signUp,
    signIn,
    logout,
  };
}; 