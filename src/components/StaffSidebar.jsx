import './staffSidebar.css';
import logo from '../assets/logo.png';
import { MdAdd, MdMailOutline } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

function StaffSidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
        <strong>Inventory</strong>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Navigation</div>
        <Link to="/staff-dashboard" className={location.pathname === '/staff-dashboard' ? 'active' : 'inactive'}><MdAdd className="icon" /> Request Device</Link>
        <Link to="/staff-requests" className={location.pathname === '/staff-requests' ? 'active' : 'inactive'}><MdMailOutline className="icon" /> My Requests</Link>
      </nav>
    </aside>
  );
}

export default StaffSidebar;
