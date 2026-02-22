import './topbar.css';
import { MdExitToApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Add backend logout call here if needed
   
    
    navigate('/login');
  };

  return (
    <header className="topbar">
      <div />
      <div className="topbar-right">
        <span className="role-badge">IT Admin</span>
        <span>Desk User</span>
        <button className="logout-btn" onClick={handleLogout}><MdExitToApp /></button>
      </div>
    </header>
  );
}

export default Topbar;
