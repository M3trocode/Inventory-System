import { useState } from 'react';
import FilterBar from './FilterBar';
import DeviceTable from './DeviceTable';

function Devices() {
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All Statuses');
  const [department, setDepartment] = useState('All Ministries');

  return (
    <div className="devices-page">
      <h1>Devices</h1>
      <FilterBar
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        department={department}
        setDepartment={setDepartment}
      />
      <DeviceTable
        category={category}
        status={status}
        department={department}
      />
    </div>
  );
}

export default Devices;
