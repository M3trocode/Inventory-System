# Ministry Display Fix

## Changes Made

### 1. Device Assignment Now Includes Ministry
Updated the `assignDevice` function to accept and store the requester's ministry:

**DevicesContext.jsx:**
```javascript
function assignDevice(deviceId, assignedTo, ministry) {
  console.log('Assigning device:', deviceId, 'to:', assignedTo, 'from:', ministry);
  setDevices((prevDevices) =>
    prevDevices.map((device) =>
      device.id === deviceId
        ? { ...device, status: DEVICE_STATUSES[1], assignedTo, ministry }
        : device
    )
  );
}
```

**IssueDevice.jsx:**
```javascript
// Pass the requester's ministry when assigning
assignDevice(dev.id, req.requesterName, req.ministry);
```

### 2. Device Category Display in Requests
Added fallback to handle both old and new data formats:

**Requests.jsx:**
```javascript
<td>{req.deviceCategory || req.deviceName || '—'}</td>
```

This ensures:
- New data shows `deviceCategory` (e.g., "Laptop")
- Old data shows `deviceName` (e.g., "HP EliteBook Laptop")
- Missing data shows "—"

### 3. Debug Logging
Added console logging to help troubleshoot:
```javascript
console.log('Request data:', requests);
```

## How It Works Now

### Device Assignment Flow:
1. Admin selects approved request (includes requester's ministry)
2. Admin selects available device
3. Admin clicks "Assign"
4. Device is updated with:
   - Status: "Issued"
   - Assigned To: Requester's name
   - Ministry: Requester's ministry ✅ NEW

### Device Table Display:
- **Before Assignment**: Ministry shows "—" or initial value
- **After Assignment**: Ministry shows requester's ministry
- **Example**: "Ministry Of Finance"

## Testing

### Test Ministry Update:
1. **Submit Request** (Staff)
   - Go to `/staff-dashboard`
   - Select device category
   - Fill in name: "John Doe"
   - Select ministry: "Ministry Of Finance"
   - Submit request

2. **Approve Request** (Admin)
   - Go to `/requests`
   - Approve the request

3. **Assign Device** (Admin)
   - Go to `/issue-device`
   - Select the approved request
   - Select an available device
   - Click "Assign"
   - ✅ Success message shows ministry

4. **Verify Ministry Display** (Admin)
   - Go to `/dashboard` or `/view-all-devices`
   - Find the assigned device in the table
   - ✅ Ministry column shows "Ministry Of Finance"

### Test Device Category Display:
1. **Check Requests Page**
   - Go to `/requests`
   - Open browser console (F12)
   - Look for "Request data:" log
   - Verify each request has `deviceCategory` field

2. **If Still Showing Old Data**
   - Clear localStorage: `localStorage.clear(); location.reload();`
   - Submit a new request
   - Check requests page again
   - ✅ Should show device category

## Data Structure

### Request Object (New):
```json
{
  "id": 1708531200000,
  "deviceCategory": "Laptop",
  "requesterName": "John Doe",
  "ministry": "Ministry Of Finance",
  "reason": "For daily office work",
  "status": "Pending",
  "dateRequested": "2024-02-18"
}
```

### Device Object (After Assignment):
```json
{
  "id": 1708531200000,
  "name": "Dell Latitude 5540",
  "category": "Laptop",
  "serial": "DL-12345",
  "ministry": "Ministry Of Finance",  // ✅ Updated from requester
  "status": "Issued",
  "assignedTo": "John Doe"
}
```

## Troubleshooting

### Ministry Not Showing?
1. Check console logs for assignment
2. Verify request has ministry field
3. Clear localStorage and test with fresh data
4. Check DeviceTable is using latest code

### Device Category Not Showing?
1. Open browser console
2. Look for "Request data:" log
3. Check if requests have `deviceCategory` field
4. If not, clear localStorage: `localStorage.clear(); location.reload();`
5. Submit new request and check again

### Old Data Migration
The app automatically migrates old data:
- `deviceName` → `deviceCategory`
- But if issues persist, clear localStorage for fresh start

## Console Commands

### Check Current Data:
```javascript
// Check requests
console.log(JSON.parse(localStorage.getItem('staffRequests')));

// Check devices
console.log(JSON.parse(localStorage.getItem('devices')));
```

### Clear Specific Data:
```javascript
// Clear only requests
localStorage.removeItem('staffRequests');
location.reload();

// Clear only devices
localStorage.removeItem('devices');
location.reload();

// Clear everything
localStorage.clear();
location.reload();
```

## Benefits

1. **Accurate Ministry Tracking**: Devices show which ministry they're assigned to
2. **Better Reporting**: Can filter devices by ministry
3. **Data Consistency**: Ministry follows the device assignment
4. **Audit Trail**: Know which ministry has which devices
5. **Backward Compatible**: Handles both old and new data formats

## Next Steps

Consider adding:
1. Ministry transfer functionality
2. Ministry-based device reports
3. Ministry-specific device quotas
4. Ministry admin roles
5. Device return to original ministry
