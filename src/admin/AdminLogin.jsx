// frontend/src/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      // ✅ FIXED URL — this is the ONLY correct login URL
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      });

      const body = await res.json();

      if (!body.success) {
        setError(body.message || 'Login failed');
        return;
      }

      const admin = body.data?.user;

      if (!admin || admin.role !== 'admin') {
        setError('Not an admin user');
        return;
      }

      // save token & admin
      localStorage.setItem('scrap_deal_admin_token', body.data.token);
      localStorage.setItem('scrap_deal_admin_user', JSON.stringify(admin));

      // redirect to dashboard
      nav('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Network or server error');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Phone</label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <button className="w-full bg-blue-600 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
