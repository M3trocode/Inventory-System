import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import FilterBar from '../../components/FilterBar';
import DeviceTable from '../../components/DeviceTable';
import { useDevices } from '../../contexts/DevicesContext';

import { MdStorage, MdCheckCircle, MdAssignment, MdWarning } from 'react-icons/md';
import './adminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const { devices = [] } = useDevices();
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All Statuses');
  const [department, setDepartment] = useState('All Ministries');

  return (
    <>
      <h1>Inventory Dashboard</h1>
      <div className="stats-grid">
        <StatCard label="Total Devices" value={devices.length} icon={<MdStorage />} />
        <StatCard label="Available" value={devices.filter(d => d.status === 'Available').length} icon={<MdCheckCircle />} />
        <StatCard label="Issued" value={devices.filter(d => d.status === 'Issued').length} icon={<MdAssignment />} />
        <StatCard label="Faulty" value={devices.filter(d => d.status === 'Faulty').length} icon={<MdWarning />} />
      </div>
      <h2 className="section-title">All Devices</h2>

      <div className="filter-and-action">
        <FilterBar
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          department={department}
          setDepartment={setDepartment}
        />
        <button className="view-all-btn" onClick={() => navigate('/view-all-devices')}>
          View All Devices
        </button>
      </div>

      <DeviceTable
        category={category}
        status={status}
        department={department}
      />
    </>
  );
}

export default AdminDashboard;
