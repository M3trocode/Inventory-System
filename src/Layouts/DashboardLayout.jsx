import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './dashboardLayout.css';

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Topbar />
        <main className="dashboard-main">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
