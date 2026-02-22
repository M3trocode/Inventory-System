import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Intro.css';
import logo from '../assets/logo.png';

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to login after animation completes (3.5 seconds)
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="intro-wrapper">
      <div className="intro-container">
        <div className="intro-logo-wrapper">
          <img src={logo} alt="Lagos State Logo" className="intro-logo" />
        </div>
        <h1 className="intro-title">Lagos State Inventory System</h1>
      </div>
    </div>
  );
}

export default Intro;
