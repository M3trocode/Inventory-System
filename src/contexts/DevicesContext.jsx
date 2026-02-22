import { createContext, useContext, useState, useEffect } from 'react';
import { DEVICE_CATEGORIES, DEVICE_STATUSES, MINISTRIES } from '../constants';

const DevicesContext = createContext(null);

const initialDevices = [];

// Load devices from localStorage or use initial data
const loadDevices = () => {
  try {
    const saved = localStorage.getItem('devices');
    return saved ? JSON.parse(saved) : initialDevices;
  } catch (error) {
    console.error('Error loading devices:', error);
    return initialDevices;
  }
};

export function DevicesProvider({ children }) {
  const [devices, setDevices] = useState(loadDevices);

  // Save devices to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('devices', JSON.stringify(devices));
      console.log('Devices saved to localStorage:', devices.length, 'devices');
    } catch (error) {
      console.error('Error saving devices:', error);
    }
  }, [devices]);

  function addDevice(device) {
    // Normalize incoming form data to device object used across the app
    const normalized = {
      id: Date.now(), // Add unique ID
      name: `${device.brand ? device.brand : ''} ${device.model ? device.model : ''}`.trim() || 'New Device',
      category: device.category || 'Uncategorized',
      serial: device.serialNumber || `SN-${Date.now()}`,
      ministry: device.ministry || '—',
      status: device.condition === DEVICE_STATUSES[2] ? DEVICE_STATUSES[2] : DEVICE_STATUSES[0], // Faulty or Available
      assignedTo: null,
    };

    console.log('Adding new device:', normalized);
    setDevices((d) => [normalized, ...d]);

    return normalized;
  }

  function assignDevice(deviceId, assignedTo, ministry) {
    console.log('Assigning device:', deviceId, 'to:', assignedTo, 'from:', ministry);
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === deviceId
          ? { ...device, status: DEVICE_STATUSES[1], assignedTo, ministry } // Status: Issued, update ministry
          : device
      )
    );
  }

  function updateDeviceStatus(deviceId, status, assignedTo = null) {
    console.log('Updating device status:', deviceId, 'to:', status);
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === deviceId
          ? { ...device, status, assignedTo }
          : device
      )
    );
  }

  return (
    <DevicesContext.Provider value={{ 
      devices, 
      setDevices, 
      addDevice, 
      assignDevice, 
      updateDeviceStatus 
    }}>
      {children}
    </DevicesContext.Provider>
  );
}

export function useDevices() {
  const ctx = useContext(DevicesContext);
  if (!ctx) throw new Error('useDevices must be used within DevicesProvider');
  return ctx;
}

export default DevicesContext;
