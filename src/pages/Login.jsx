import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@mist.gov.ng' && password) {
      navigate('/dashboard');
    } else if (email === 'staff@mist.gov.ng' && password) {
      navigate('/staff-dashboard');
    } else if (email !== 'admin@mist.gov.ng' && email !== 'staff@mist.gov.ng') {
      setError('Invalid email. Use admin@mist.gov.ng or staff@mist.gov.ng');
    } else if (!password) {
      setError('Password is required');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={logo} alt="Lagos State Logo" className="login-logo" />

        <h1>Inventory</h1>
        <p className="subtitle">Lagos State Inventory System</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@mist.gov.ng"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="super secret password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <span className="error-message">{error}</span>}

          <button type="submit">Sign In</button>

          <span className="forgot-password">Forgot password?</span>
        </form>
      </div>
    </div>
  );
}

export default Login;
