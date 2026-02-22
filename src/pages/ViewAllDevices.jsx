import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { useDevices } from '../contexts/DevicesContext';
import './viewAllDevices.css';

function ViewAllDevices() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { devices = [] } = useDevices();

  const filteredDevices = devices.filter((device) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      device.name.toLowerCase().includes(lowerSearch) ||
      device.category.toLowerCase().includes(lowerSearch) ||
      device.serial.toLowerCase().includes(lowerSearch) ||
      device.ministry.toLowerCase().includes(lowerSearch) ||
      device.status.toLowerCase().includes(lowerSearch) ||
      (device.assignedTo && device.assignedTo.toLowerCase().includes(lowerSearch))
    );
  });

  return (
    <div className="view-all-devices-container">
      <div className="view-all-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>All Devices</h1>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by device name, serial number, category, ministry, status, or assigned person..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p className="search-results-count">
          {filteredDevices.length} device{filteredDevices.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="table-wrapper">
        <table className="device-table">
          <thead>
            <tr>
              <th scope="col">Device Name</th>
              <th scope="col">Category</th>
              <th scope="col">Serial Number</th>
              <th scope="col">Ministry</th>
              <th scope="col">Status</th>
              <th scope="col">Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device, i) => (
                <tr key={`${device.serial}-${i}`}>
                  <td>{device.name}</td>
                  <td>{device.category}</td>
                  <td>{device.serial}</td>
                  <td>{device.ministry}</td>
                  <td>
                    <StatusBadge status={device.status} />
                  </td>
                  <td>
                    {device.assignedTo ? device.assignedTo : '—'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">
                  No devices found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAllDevices;
