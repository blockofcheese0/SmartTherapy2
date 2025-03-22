import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (username.toLowerCase() === 'therapist' && password === 'therapist') {
      navigate('/therapistWelcome');
    } else if (username.toLowerCase() === 'patient' && password === 'patient') {
      navigate('/form');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="p-4 p-md-5 bg-white rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <h1 className="h3 text-primary">SmartTherapy Login</h1>
          <p className="text-muted">Please enter your credentials to continue</p>
        </div>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid gap-2 mb-3">
            <button type="submit" className="btn btn-primary btn-lg py-2">
              Log In
            </button>
          </div>

          
        </form>


       
      </div>
    </div>
  );
}

export default Login;