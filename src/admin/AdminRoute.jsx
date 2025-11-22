// frontend/src/admin/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('scrap_deal_admin_token');
  const user = JSON.parse(localStorage.getItem('scrap_deal_admin_user') || 'null');

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
