import './staffTopbar.css';
import { MdExitToApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


function StaffTopbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="topbar">
      <div />
      <div className="topbar-right">
        <span className="role-badge">Staff</span>
        <span>Staff User</span>
        <button className="logout-btn" onClick={handleLogout}><MdExitToApp /></button>
      </div>
    </header>
  );
}

export default StaffTopbar;
