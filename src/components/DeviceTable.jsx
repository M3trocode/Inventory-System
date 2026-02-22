import StatusBadge from './StatusBadge';
import './deviceTable.css';
import { useDevices } from '../contexts/DevicesContext';

function DeviceTable({ category = 'All Categories', status = 'All Statuses', department = 'All Ministries' }) {
  const { devices = [] } = useDevices();

  const filteredDevices = devices.filter((device) => {
    const categoryMatch = category === 'All Categories' || device.category === category;
    const statusMatch = status === 'All Statuses' || device.status === status;
    const departmentMatch = department === 'All Ministries' || device.ministry === department;
    return categoryMatch && statusMatch && departmentMatch;
  });

  return (
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
          {filteredDevices.map((device, i) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeviceTable;
