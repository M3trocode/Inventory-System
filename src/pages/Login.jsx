import './Login.css';
import logo from '../assets/logo.png';
import { Button } from '../components/ui/button';

function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={logo} alt="Lagos State Logo" className="login-logo" />

        <h1>Inventory</h1>
        <p className="subtitle">Lagos State Inventory System</p>

        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="admin@mist.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <Button variant="outline">Sign In</Button>

          <button type="submit">Sign In</button>

          <span className="forgot-password">Forgot password?</span>
        </form>
      </div>
    </div>
  );
}

export default Login;
