import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DevicesProvider } from './contexts/DevicesContext';
import { StaffRequestsProvider } from './contexts/StaffRequestsContext';
console.log('App module loaded');
import Intro from './pages/Intro';
import Login from './pages/Login';
import DashboardLayout from './Layouts/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ViewAllDevices from './pages/ViewAllDevices';
import AddDevice from './components/AddDevice';
import Requests from './components/Requests';
import IssueDevice from './components/IssueDevice';
import StaffDashboardLayout from './Layouts/StaffDashboardLayout';
import RequestDevice from './pages/staff/RequestDevice';
import MyRequests from './pages/staff/MyRequests';

function App() {
  return (
    <DevicesProvider>
      <StaffRequestsProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
          <Route path="/view-all-devices" element={<DashboardLayout><ViewAllDevices /></DashboardLayout>} />
          <Route path="/add-device" element={<DashboardLayout><AddDevice /></DashboardLayout>} />
          <Route path="/requests" element={<DashboardLayout><Requests /></DashboardLayout>} />
          <Route path="/issue-device" element={<DashboardLayout><IssueDevice /></DashboardLayout>} />
          <Route path="/staff-dashboard" element={<StaffDashboardLayout><RequestDevice /></StaffDashboardLayout>} />
          <Route path="/staff-requests" element={<StaffDashboardLayout><MyRequests /></StaffDashboardLayout>} />
          </Routes>
        </BrowserRouter>
      </StaffRequestsProvider>
    </DevicesProvider>
  );
}

export default App;

