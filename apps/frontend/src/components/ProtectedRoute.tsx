import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
}; 