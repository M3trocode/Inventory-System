# Device Request Flow Documentation

## Overview
The device request system connects staff members with IT admins through a shared context-based state management system.

## Flow Diagram

```
Staff User                    Context                     IT Admin
    |                            |                            |
    |  1. Fill Request Form      |                            |
    |--------------------------->|                            |
    |  (RequestDevice.jsx)       |                            |
    |                            |                            |
    |  2. Submit Request         |                            |
    |--------------------------->|                            |
    |  submitRequest()           |                            |
    |                            |                            |
    |                            | 3. Request Added           |
    |                            |    to Context              |
    |                            |    (Status: Pending)       |
    |                            |                            |
    |  4. View in My Requests    |                            |
    |<---------------------------|                            |
    |  (MyRequests.jsx)          |                            |
    |                            |                            |
    |                            | 5. Admin Views Request     |
    |                            |--------------------------->|
    |                            |    (Requests.jsx)          |
    |                            |                            |
    |                            | 6. Admin Approves/Rejects  |
    |                            |<---------------------------|
    |                            |    approveRequest() or     |
    |                            |    rejectRequest()         |
    |                            |                            |
    |  7. Status Updated         |                            |
    |<---------------------------|                            |
    |  (Visible in MyRequests)   |                            |
```

## Components Involved

### 1. RequestDevice.jsx (Staff)
- **Location**: `src/pages/staff/RequestDevice.jsx`
- **Purpose**: Staff members select a device and fill out request form
- **Actions**: 
  - Select device from available devices
  - Fill in requester name, ministry, and reason
  - Submit request via `submitRequest()`

### 2. MyRequests.jsx (Staff)
- **Location**: `src/pages/staff/MyRequests.jsx`
- **Purpose**: Staff members view their submitted requests and status
- **Data**: Reads `requests` from context
- **Displays**: Device name, ministry, reason, date, and status

### 3. Requests.jsx (Admin)
- **Location**: `src/components/Requests.jsx`
- **Purpose**: IT admins view all requests and approve/reject them
- **Actions**:
  - View all pending, approved, and rejected requests
  - Approve pending requests via `approveRequest()`
  - Reject pending requests via `rejectRequest()`

### 4. StaffRequestsContext.jsx
- **Location**: `src/contexts/StaffRequestsContext.jsx`
- **Purpose**: Central state management for all requests
- **Functions**:
  - `submitRequest(requestData)` - Adds new request
  - `approveRequest(id)` - Updates status to "Approved"
  - `rejectRequest(id)` - Updates status to "Rejected"

## Data Structure

### Request Object
```javascript
{
  id: number,              // Unique timestamp-based ID
  deviceName: string,      // Name of requested device
  requesterName: string,   // Staff member's name
  ministry: string,        // Staff member's ministry
  reason: string,          // Reason for request
  status: string,          // "Pending" | "Approved" | "Rejected"
  dateRequested: string    // ISO date format (YYYY-MM-DD)
}
```

## Testing the Flow

### Step 1: Submit a Request (Staff)
1. Navigate to `/staff-dashboard` (RequestDevice page)
2. Select a device from the available devices grid
3. Fill in the form:
   - Your Name
   - Ministry (dropdown)
   - Reason for Request
4. Click "Submit Request"
5. Success message appears

### Step 2: View in My Requests (Staff)
1. Navigate to `/staff-requests` (MyRequests page)
2. The newly submitted request appears in the table
3. Status shows as "Pending"

### Step 3: Admin Reviews Request
1. Navigate to `/requests` (Admin Requests page)
2. The same request appears in the admin's table
3. Request shows with all details including reason and date

### Step 4: Admin Takes Action
1. For pending requests, admin sees "Approve" and "Reject" buttons
2. Click "Approve" to approve the request
3. Status updates to "Approved" immediately

### Step 5: Staff Sees Updated Status
1. Return to `/staff-requests` (MyRequests page)
2. The request status now shows "Approved"
3. Status badge color changes to green

## Key Features

✅ **Real-time Updates**: All components share the same context, so changes are immediate
✅ **Centralized State**: Single source of truth in StaffRequestsContext
✅ **Status Management**: Three states (Pending, Approved, Rejected)
✅ **Complete Information**: Includes requester details, device info, reason, and date
✅ **Action Controls**: Admins can only act on pending requests
✅ **User Feedback**: Success messages and visual status indicators

## Routes

- **Staff Request Form**: `/staff-dashboard`
- **Staff My Requests**: `/staff-requests`
- **Admin Requests**: `/requests`
