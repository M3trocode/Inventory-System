import CustomSelect from './CustomSelect';
import './filterBar.css';
import { DEVICE_CATEGORIES, DEVICE_STATUSES, MINISTRIES } from '../constants';

function FilterBar({ category, setCategory, status, setStatus, department, setDepartment }) {
  return (
    <div className="filter-bar">
      <CustomSelect
        options={['All Categories', ...DEVICE_CATEGORIES]}
        value={category}
        onChange={setCategory}
      />

      <CustomSelect
        options={['All Statuses', ...DEVICE_STATUSES]}
        value={status}
        onChange={setStatus}
      />

      <CustomSelect
        options={['All Ministries', ...MINISTRIES]}
        value={department}
        onChange={setDepartment}
      />
    </div>
  );
}

export default FilterBar;
