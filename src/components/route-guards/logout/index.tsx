import { Navigate, Outlet } from 'react-router-dom';
import React, { PropsWithChildren } from 'react';

export const LogoutGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  let token: string | null = null;

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      token = parsedUser.access;
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
    }
  }

  if (!token) {
    return <Navigate to='/login' />;
  }

  return children || <Outlet />;
};
