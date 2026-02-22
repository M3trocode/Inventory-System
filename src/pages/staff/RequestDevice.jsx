import { useState } from 'react';
import { useStaffRequests } from '../../contexts/StaffRequestsContext';
import DeviceCard from '../../components/DeviceCard';
import './requestDevice.css';
import { MINISTRIES } from '../../constants';

function RequestDevice() {
  const { availableDevices, submitRequest } = useStaffRequests();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [formData, setFormData] = useState({
    requesterName: '',
    ministry: '',
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDevice || !formData.requesterName || !formData.ministry || !formData.reason) {
      alert('Please fill in all fields');
      return;
    }

    submitRequest({
      deviceCategory: selectedDevice.category,
      requesterName: formData.requesterName,
      ministry: formData.ministry,
      reason: formData.reason,
    });

    setSubmitted(true);
    setFormData({
      requesterName: '',
      ministry: '',
      reason: '',
    });
    setSelectedDevice(null);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="request-device-page">
      <h1>Request Device</h1>

      {submitted && (
        <div className="success-message">
          ✓ Device request submitted successfully!
        </div>
      )}

      <div className="request-device-container">
        {/* Devices Grid */}
        <div className="devices-section">
          <h2>Available Devices</h2>
          <div className="devices-grid">
            {availableDevices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onSelect={handleDeviceSelect}
              />
            ))}
          </div>
        </div>

        {/* Form Section */}
        {selectedDevice && (
          <div className="request-form-section">
            <div className="form-card">
              <h2>Request Details</h2>

              <div className="selected-device-info">
                <p className="selected-device-label">Selected Device:</p>
                <p className="selected-device-name">{selectedDevice.category}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <label>
                  Your Name
                  <input
                    type="text"
                    name="requesterName"
                    value={formData.requesterName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </label>

                <label>
                  Ministry
                  <select
                    name="ministry"
                    value={formData.ministry}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Ministry</option>
                    {MINISTRIES.map((ministry) => (
                      <option key={ministry} value={ministry}>
                        {ministry}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Reason for Request
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Explain why you need this device"
                    rows="4"
                  />
                </label>

                <button type="submit" className="submit-btn">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestDevice;
