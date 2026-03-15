import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/admin/login', {
        username: credentials.username.trim(),
        password: credentials.password
      });

      // Store JWT token in sessionStorage (cleared when tab closes)
      sessionStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="admin-login">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-icon" aria-hidden="true">🔐</div>
          <h2>Admin Login</h2>
          <p className="admin-login-subtitle">Enter your credentials to access the admin panel.</p>

          {error && (
            <div className="admin-error-message" role="alert" aria-live="polite">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="admin-username">Username</label>
              <input
                type="text"
                id="admin-username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="username"
                placeholder="Enter username"
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <input
                type="password"
                id="admin-password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="current-password"
                placeholder="Enter password"
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
