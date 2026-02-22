import './filterSelect.css';

function FilterSelect({ options }) {
  return (
    <div className="filter-select">
      <select>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterSelect;
