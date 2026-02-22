import StaffSidebar from '../components/StaffSidebar';
import StaffTopbar from '../components/StaffTopbar';
import './dashboardLayout.css';

function StaffDashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <StaffSidebar />

      <div className="dashboard-content">
        <StaffTopbar />
        <main className="dashboard-main">{children}</main>
      </div>
    </div>
  );
}

export default StaffDashboardLayout;
