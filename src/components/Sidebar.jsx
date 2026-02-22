import './sidebar.css';
import logo from '../assets/logo.png';
import { MdDashboard, MdAdd, MdMailOutline, MdAssignment, MdRestartAlt } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
        <strong>Inventory</strong>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Navigation</div>
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : 'inactive'}><MdDashboard className="icon" /> Dashboard</Link>
        <Link to="/add-device" className={location.pathname === '/add-device' ? 'active' : 'inactive'}><MdAdd className="icon" /> Add device</Link>
        <Link to="/requests" className={location.pathname === '/requests' ? 'active' : 'inactive'}><MdMailOutline className="icon" /> Requests</Link>
        <Link to="/issue-device" className={location.pathname === '/issue-device' ? 'active' : 'inactive'}><MdAssignment className="icon" /> Issue Device</Link>
        {/* <a className="inactive"><MdRestartAlt className="icon" /> Returns</a> */}
      </nav>
    </aside>
  );
}

export default Sidebar;
