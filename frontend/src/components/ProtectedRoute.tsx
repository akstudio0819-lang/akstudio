import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRole 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-studio-black">
        <div className="w-10 h-10 border-4 border-accent-indigo border-t-accent-cyan rounded-full animate-spin" />
        <p className="text-xs text-studio-text tracking-widest uppercase">Verifying Authorization...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if unauthenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // If client visits admin path or vice versa, redirect to respective safe portals
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
