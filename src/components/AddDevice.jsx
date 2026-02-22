import { useState } from 'react';
import CustomSelect from './CustomSelect';
import './addDevice.css';
import { useDevices } from '../contexts/DevicesContext';
import { DEVICE_CATEGORIES, DEVICE_CONDITIONS } from '../constants';

function AddDevice() {
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    model: '',
    serialNumber: '',
    condition: '',
    quantity: 1,
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setSubmitted(false);
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setSubmitted(false);
  };

  const { addDevice } = useDevices();

  const handleSubmit = (e) => {
    e.preventDefault();
    const added = addDevice(formData);
    setLastSubmitted({ ...formData, ...added });
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 4000);
  };


  return (
    <div className="add-device-page">
      <div className="page-header">
        <h1>Add New Device</h1>
      </div>

      {submitted && (
        <div className="success-message">
          ✓ Device added successfully! Processing your entry...
        </div>
      )}

      <form className="add-device-form" onSubmit={handleSubmit}>
        {/* Category */}
        <div className="field">
          <label>Category</label>
          <CustomSelect
            placeholder="Select category"
            options={DEVICE_CATEGORIES}
            value={formData.category}
            onChange={(value) => handleSelectChange('category', value)}
          />
        </div>

        {/* Brand & Model */}
        <div className="two-columns">
          <label>
            Brand
            <input
              type="text"
              name="brand"
              placeholder="e.g Dell"
              value={formData.brand}
              onChange={handleChange}
            />
          </label>

          <label>
            Model
            <input
              type="text"
              name="model"
              placeholder="e.g Latitude 5540"
              value={formData.model}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Serial Number */}
        <label>
          Serial Number
          <input
            type="text"
            name="serialNumber"
            placeholder="Unique number"
            value={formData.serialNumber}
            onChange={handleChange}
          />
        </label>

        {/* Condition & Quantity */}
        <div className="two-columns">
          <div>
            <label>Condition</label>
            <CustomSelect
              placeholder="Select condition"
              options={DEVICE_CONDITIONS}
              value={formData.condition}
              onChange={(value) => handleSelectChange('condition', value)}
            />
          </div>

          <label>
            Quantity
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Add to inventory</button>
      </form>

      {lastSubmitted && (
        <div className="submitted-data">
          <h2>Last Submitted Device</h2>
          <div className="data-grid">
            <div className="data-item">
              <span className="label">Category:</span>
              <span className="value">{lastSubmitted.category || '—'}</span>
            </div>
            <div className="data-item">
              <span className="label">Brand:</span>
              <span className="value">{lastSubmitted.brand || '—'}</span>
            </div>
            <div className="data-item">
              <span className="label">Model:</span>
              <span className="value">{lastSubmitted.model || '—'}</span>
            </div>
            <div className="data-item">
              <span className="label">Serial Number:</span>
              <span className="value">{lastSubmitted.serialNumber || '—'}</span>
            </div>
            <div className="data-item">
              <span className="label">Condition:</span>
              <span className="value">{lastSubmitted.condition || '—'}</span>
            </div>
            <div className="data-item">
              <span className="label">Quantity:</span>
              <span className="value">{lastSubmitted.quantity}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddDevice;
