# Backend Integration Guide

## Overview
All categories, ministries, and statuses are now centralized in a single constants file for easy backend integration and consistency across the application.

## Constants Location
**File**: `src/constants/index.js`

All dropdown values, status options, and category lists are defined here. This ensures:
- Consistency across all components
- Easy updates (change once, applies everywhere)
- Simple backend integration (use the same values)

## Available Constants

### 1. DEVICE_CATEGORIES
```javascript
export const DEVICE_CATEGORIES = [
  'Laptop',
  'Desktop',
  'Printer',
  'Monitor',
  'Router',
  'Switches',
  'Projectors',
  'Servers'
];
```

**Used in:**
- AddDevice form (category selection)
- FilterBar (category filter)
- StaffRequestsContext (available devices)
- DevicesContext (device records)

**Database Field**: `category` (VARCHAR)

---

### 2. MINISTRIES
```javascript
export const MINISTRIES = [
  'Ministry Of Finance',
  'Ministry Of Health',
  'Ministry Of Technology',
  'Ministry Of Works',
  'Ministry Of Education',
  'Ministry Of Science and Technology',
  'Ministry Of Human Resources',
  'Ministry Of Youth and Social Development'
];
```

**Used in:**
- RequestDevice form (ministry selection)
- FilterBar (ministry filter)
- IssueDevice (approved requests)
- DevicesContext (device assignment)
- StaffRequestsContext (request records)

**Database Field**: `ministry` (VARCHAR)

---

### 3. DEVICE_STATUSES
```javascript
export const DEVICE_STATUSES = [
  'Available',
  'Issued',
  'Faulty'
];
```

**Used in:**
- FilterBar (status filter)
- DevicesContext (device status)
- Device management and tracking

**Database Field**: `status` (VARCHAR or ENUM)

---

### 4. DEVICE_CONDITIONS
```javascript
export const DEVICE_CONDITIONS = [
  'New',
  'Used',
  'Faulty'
];
```

**Used in:**
- AddDevice form (condition selection)
- Device creation and inventory management

**Database Field**: `condition` (VARCHAR or ENUM)

---

### 5. REQUEST_STATUSES
```javascript
export const REQUEST_STATUSES = [
  'Pending',
  'Approved',
  'Rejected'
];
```

**Used in:**
- StaffRequestsContext (request workflow)
- Requests component (admin actions)
- MyRequests component (staff view)

**Database Field**: `status` (VARCHAR or ENUM)

---

## Database Schema Recommendations

### Devices Table
```sql
CREATE TABLE devices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,  -- Use DEVICE_CATEGORIES values
  serial VARCHAR(100) UNIQUE NOT NULL,
  ministry VARCHAR(100),  -- Use MINISTRIES values
  status VARCHAR(20) DEFAULT 'Available',  -- Use DEVICE_STATUSES values
  condition VARCHAR(20),  -- Use DEVICE_CONDITIONS values
  assigned_to VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Requests Table
```sql
CREATE TABLE requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  device_name VARCHAR(255) NOT NULL,
  requester_name VARCHAR(255) NOT NULL,
  ministry VARCHAR(100) NOT NULL,  -- Use MINISTRIES values
  reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending',  -- Use REQUEST_STATUSES values
  date_requested DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## API Endpoints Recommendations

### GET /api/constants
Returns all constants for frontend validation and dropdown population.

**Response:**
```json
{
  "deviceCategories": ["Laptop", "Desktop", "Printer", ...],
  "ministries": ["Ministry Of Finance", "Ministry Of Health", ...],
  "deviceStatuses": ["Available", "Issued", "Faulty"],
  "deviceConditions": ["New", "Used", "Faulty"],
  "requestStatuses": ["Pending", "Approved", "Rejected"]
}
```

### POST /api/devices
Create a new device.

**Request Body:**
```json
{
  "name": "HP EliteBook",
  "category": "Laptop",  // Must match DEVICE_CATEGORIES
  "serial": "HP-12345",
  "ministry": "Ministry Of Finance",  // Must match MINISTRIES
  "condition": "New",  // Must match DEVICE_CONDITIONS
  "status": "Available"  // Must match DEVICE_STATUSES
}
```

### POST /api/requests
Create a new device request.

**Request Body:**
```json
{
  "deviceName": "HP EliteBook Laptop",
  "requesterName": "John Doe",
  "ministry": "Ministry Of Finance",  // Must match MINISTRIES
  "reason": "For daily office work",
  "status": "Pending"  // Must match REQUEST_STATUSES
}
```

### PATCH /api/requests/:id
Update request status (approve/reject).

**Request Body:**
```json
{
  "status": "Approved"  // Must be one of REQUEST_STATUSES
}
```

---

## Validation Rules

### Backend Validation
Always validate incoming data against the constants:

```javascript
// Example validation (Node.js/Express)
const { MINISTRIES, DEVICE_CATEGORIES, REQUEST_STATUSES } = require('./constants');

function validateRequest(req, res, next) {
  const { ministry, status } = req.body;
  
  if (!MINISTRIES.includes(ministry)) {
    return res.status(400).json({ error: 'Invalid ministry' });
  }
  
  if (!REQUEST_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  next();
}
```

---

## Adding New Values

To add new categories, ministries, or statuses:

1. **Update the constants file**: `src/constants/index.js`
2. **Update the database**: Add new values to relevant tables
3. **Update backend validation**: Ensure new values are accepted
4. **No component changes needed**: All components automatically use the updated constants

### Example: Adding a New Ministry
```javascript
// In src/constants/index.js
export const MINISTRIES = [
  'Ministry Of Finance',
  'Ministry Of Health',
  'Ministry Of Technology',
  'Ministry Of Works',
  'Ministry Of Education',
  'Ministry Of Science and Technology',
  'Ministry Of Human Resources',
  'Ministry Of Youth and Social Development',
  'Ministry Of Agriculture',  // NEW
];
```

That's it! The new ministry will appear in all dropdowns automatically.

---

## Components Using Constants

| Component | Constants Used |
|-----------|---------------|
| AddDevice.jsx | DEVICE_CATEGORIES, DEVICE_CONDITIONS |
| FilterBar.jsx | DEVICE_CATEGORIES, DEVICE_STATUSES, MINISTRIES |
| RequestDevice.jsx | MINISTRIES |
| IssueDevice.jsx | MINISTRIES, REQUEST_STATUSES |
| DevicesContext.jsx | DEVICE_CATEGORIES, DEVICE_STATUSES, MINISTRIES |
| StaffRequestsContext.jsx | DEVICE_CATEGORIES, MINISTRIES, REQUEST_STATUSES |

---

## Testing Checklist

- [ ] Verify all dropdowns show correct values
- [ ] Test form submissions with each constant value
- [ ] Verify backend accepts all constant values
- [ ] Test filtering with each category/ministry/status
- [ ] Verify database stores values correctly
- [ ] Test request approval/rejection workflow
- [ ] Verify localStorage persistence works with constants

---

## Notes for Backend Developer

1. **Case Sensitivity**: All values are case-sensitive. "Ministry Of Finance" ≠ "ministry of finance"
2. **Exact Matches**: Use exact string matching for validation
3. **No Hardcoding**: Import constants from the centralized file, don't hardcode values
4. **Sync Required**: Keep backend constants in sync with frontend constants file
5. **Database Enums**: Consider using ENUM types in database for better validation
