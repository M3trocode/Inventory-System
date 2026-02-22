import { useState } from 'react';
import './issueDevice.css';
import CustomSelect from './CustomSelect';
import { useDevices } from '../contexts/DevicesContext';
import { useStaffRequests } from '../contexts/StaffRequestsContext';
import { REQUEST_STATUSES } from '../constants';

function IssueDevice() {
  const { devices, assignDevice } = useDevices();
  const { requests } = useStaffRequests();
  
  // Filter only approved requests
  const approvedRequests = requests.filter(req => req.status === REQUEST_STATUSES[1]); // Approved

  // Filter devices with 'Available' status from context
  const availableDevices = devices.filter(d => d.status === 'Available');

  const [selectedRequest, setSelectedRequest] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [assignmentMessage, setAssignmentMessage] = useState('');

  const approvedRequestOptions = approvedRequests.map(
    (r) => `${r.requesterName} – ${r.deviceCategory}`
  );

  // Get the selected request to filter devices by category
  const selectedRequestObj = selectedRequest 
    ? approvedRequests.find(r => `${r.requesterName} – ${r.deviceCategory}` === selectedRequest)
    : null;

  // Filter devices by category if a request is selected
  const filteredAvailableDevices = selectedRequestObj
    ? availableDevices.filter(d => d.category === selectedRequestObj.deviceCategory)
    : availableDevices;

  const availableDeviceOptions = filteredAvailableDevices.map(
    (d) => `${d.name} – ${d.serial}`
  );

  return (
    <div className="issue-device-page">
      <h1>Issue Device</h1>

      <div className="issue-card">
        {approvedRequests.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            No approved requests available to issue devices.
          </div>
        ) : (
          <>
            {/* Approved Request */}
            <div className="field">
              <label>Approved Requests</label>
              <CustomSelect
                options={["Select approved request", ...approvedRequestOptions]}
                value={selectedRequest || ""}
                onChange={(val) => {
                  const newRequest = val === "Select approved request" ? "" : val;
                  setSelectedRequest(newRequest);
                  // Clear device selection when request changes
                  setSelectedDevice("");
                }}
              />
            </div>

            {/* Request Details */}
            {selectedRequest && (
              <div className="request-details">
                {approvedRequests
                  .filter((req) => `${req.requesterName} – ${req.deviceCategory}` === selectedRequest)
                  .map((req) => (
                    <div key={req.id}>
                      <p><strong>Requester:</strong> {req.requesterName}</p>
                      <p><strong>Ministry:</strong> {req.ministry}</p>
                      <p><strong>Device Category:</strong> {req.deviceCategory}</p>
                      <p><strong>Reason:</strong> {req.reason}</p>
                    </div>
                  ))}
              </div>
            )}

            {/* Assign Device */}
            <div className="field">
              <label>
                Assign Devices
                {selectedRequestObj && (
                  <span style={{ fontSize: '0.9em', color: '#666', marginLeft: '8px' }}>
                    (Showing {selectedRequestObj.deviceCategory} devices only)
                  </span>
                )}
              </label>
              <CustomSelect
                options={
                  filteredAvailableDevices.length > 0
                    ? ["Select Devices", ...availableDeviceOptions]
                    : [`No ${selectedRequestObj?.deviceCategory || 'available'} devices available`]
                }
                value={selectedDevice || ""}
                onChange={(val) => setSelectedDevice(val === "Select Devices" ? "" : val)}
                disabled={filteredAvailableDevices.length === 0}
              />
            </div>

            {selectedDevice && (
              <div className="selected-device">
                {filteredAvailableDevices
                  .filter((d) => `${d.name} – ${d.serial}` === selectedDevice)
                  .map((d) => (
                    <span key={d.id}>{d.name} – {d.serial}</span>
                  ))}

                {/* Show Assign button only when a request is selected too */}
                {selectedRequest && (
                  <div style={{ marginTop: 12 }}>
                    <button
                      className="assign-btn"
                      onClick={() => {
                        // find objects
                        const req = approvedRequests.find(r => `${r.requesterName} – ${r.deviceCategory}` === selectedRequest);
                        const dev = filteredAvailableDevices.find(d => `${d.name} – ${d.serial}` === selectedDevice);
                        if (!req || !dev) return;

                        // Update device status to "Issued" and assign to requester with their ministry
                        assignDevice(dev.id, req.requesterName, req.ministry);

                        setAssignmentMessage(`Assigned ${dev.name} (${dev.serial}) to ${req.requesterName} from ${req.ministry}`);

                        // clear selections
                        setSelectedDevice('');
                        setSelectedRequest('');

                        // clear message after a short time
                        setTimeout(() => setAssignmentMessage(''), 4000);
                      }}
                    >
                      Assign
                    </button>
                  </div>
                )}
              </div>
            )}

            {assignmentMessage && (
              <div className="assignment-message">{assignmentMessage}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default IssueDevice;
