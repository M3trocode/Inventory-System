import { createContext, useContext, useState, useEffect } from 'react';
import { DEVICE_CATEGORIES, MINISTRIES, REQUEST_STATUSES } from '../constants';

const StaffRequestsContext = createContext(null);

const initialAvailableDevices = [
  {
    id: 1,
    name: 'Laptop',
    category: DEVICE_CATEGORIES[0], // Laptop
    icon: 'MdLaptop',
  },
  {
    id: 2,
    name: 'Desktop',
    category: DEVICE_CATEGORIES[1], // Desktop
    icon: 'MdDesktopMac',
  },
  {
    id: 3,
    name: 'Printer',
    category: DEVICE_CATEGORIES[2], // Printer
    icon: 'MdPrint',
  },
  {
    id: 4,
    name: 'Monitor',
    category: DEVICE_CATEGORIES[3], // Monitor
    icon: 'MdScreenshotMonitor',
  },
  {
    id: 5,
    name: 'Router',
    category: DEVICE_CATEGORIES[4], // Router
    icon: 'MdRouter',
  },
  {
    id: 6,
    name: 'Switches',
    category: DEVICE_CATEGORIES[5], // Switches
    icon: 'MdRouter',
  },
  {
    id: 7,
    name: 'Projectors',
    category: DEVICE_CATEGORIES[6], // Projectors
    icon: 'MdVideocam',
  },
  {
    id: 8,
    name: 'Servers',
    category: DEVICE_CATEGORIES[7], // Servers
    icon: 'MdStorage',
  },
];

const initialRequests = [];

// Load requests from localStorage or use initial data
const loadRequests = () => {
  try {
    const saved = localStorage.getItem('staffRequests');
    if (!saved) return initialRequests;
    
    const parsed = JSON.parse(saved);
    
    // Migrate old data: deviceName -> deviceCategory
    const migrated = parsed.map(req => {
      if (req.deviceName && !req.deviceCategory) {
        console.log('Migrating old request data:', req.id);
        return {
          ...req,
          deviceCategory: req.deviceName,
          deviceName: undefined // Remove old field
        };
      }
      return req;
    });
    localStorage.setItem('staffRequests', JSON.stringify(migrated));
return migrated;
  } catch (error) {
    console.error('Error loading requests:', error);
    return initialRequests;
  }
};

export function StaffRequestsProvider({ children }) {
  const [requests, setRequests] = useState(loadRequests);
  const [availableDevices] = useState(initialAvailableDevices);

  // Save requests to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('staffRequests', JSON.stringify(requests));
    } catch (error) {
      console.error('Error saving requests:', error);
    }
  }, [requests]);

  function submitRequest(requestData) {
    const newRequest = {
      id: Date.now(),
      deviceCategory: requestData.deviceCategory,
      requesterName: requestData.requesterName,
      ministry: requestData.ministry,
      reason: requestData.reason,
      status: REQUEST_STATUSES[0], // Pending
      dateRequested: new Date().toISOString().split('T')[0],
    };
    console.log('Submitting new request:', newRequest);
    setRequests((prev) => {
      const updated = [newRequest, ...prev];
      console.log('Updated requests:', updated);
      return updated;
    });
    return newRequest;
  }

  function approveRequest(id) {
    console.log('Approving request:', id);
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: REQUEST_STATUSES[1] } : req // Approved
      )
    );
  }

  function rejectRequest(id) {
    console.log('Rejecting request:', id);
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: REQUEST_STATUSES[2] } : req // Rejected
      )
    );
  }

  return (
    <StaffRequestsContext.Provider value={{ 
      requests, 
      availableDevices, 
      submitRequest,
      approveRequest,
      rejectRequest
    }}>
      {children}
    </StaffRequestsContext.Provider>
  );
}

export function useStaffRequests() {
  const ctx = useContext(StaffRequestsContext);
  if (!ctx) throw new Error('useStaffRequests must be used within StaffRequestsProvider');
  return ctx;
}

export default StaffRequestsContext;
