import { useStaffRequests } from '../contexts/StaffRequestsContext';
import './requests.css';

function Requests() {
  const { requests, approveRequest, rejectRequest } = useStaffRequests();

  console.log('Requests component rendering with:', requests.length, 'requests');
  console.log('Request data:', requests);

  const handleApprove = (id) => {
    console.log('Admin approving request:', id);
    approveRequest(id);
  };

  const handleReject = (id) => {
    console.log('Admin rejecting request:', id);
    rejectRequest(id);
  };

  return (
    <div className="requests-page">
      <h1>Requests</h1>

      <div className="requests-card">
        <table className="requests-table">
          <thead>
            <tr>
              <th>Requester</th>
              <th>Ministry</th>
              <th>Device Category</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                  No requests yet
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.requesterName}</td>
                  <td>{req.ministry}</td>
                  <td>{req.deviceCategory || '—'}</td>
                  <td>{req.reason}</td>
                  <td>{req.dateRequested}</td>
                  <td>
                    <span className={`status ${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === 'Pending' ? (
                      <div className="action-buttons">
                        <button className="approve-btn" onClick={() => handleApprove(req.id)}>Approve</button>
                        <button className="reject-btn" onClick={() => handleReject(req.id)}>Reject</button>
                      </div>
                    ) : (
                      '--'
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Requests;