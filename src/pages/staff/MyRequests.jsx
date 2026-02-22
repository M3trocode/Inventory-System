import { useStaffRequests } from '../../contexts/StaffRequestsContext';
import './myRequests.css';

function MyRequests() {
  const { requests } = useStaffRequests();

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
    <div className="my-requests-page">
      <h1>My Requests</h1>

      {requests.length === 0 ? (
        <div className="no-requests">
          <p>You haven't made any device requests yet.</p>
        </div>
      ) : (
        <div className="requests-card">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Device Category</th>
                <th>Ministry</th>
                <th>Reason</th>
                <th>Date Requested</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.deviceCategory}</td>
                  <td>{req.ministry}</td>
                  <td>{req.reason}</td>
                  <td>{req.dateRequested}</td>
                  <td>
                    <span className={`status ${getStatusClass(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyRequests;
