# Constants Summary

## Quick Reference

All categories, ministries, and statuses are centralized in: **`src/constants/index.js`**

## What Changed

✅ Created centralized constants file  
✅ Updated all components to use constants  
✅ Removed hardcoded values from 7 files  
✅ Ensured consistency across the entire app  

## The Constants

### Device Categories
`Laptop`, `Desktop`, `Printer`, `Monitor`, `Router`, `Switches`, `Projectors`, `Servers`

### Ministries
- Ministry Of Finance
- Ministry Of Health
- Ministry Of Technology
- Ministry Of Works
- Ministry Of Education
- Ministry Of Science and Technology
- Ministry Of Human Resources
- Ministry Of Youth and Social Development

### Device Statuses
`Available`, `Issued`, `Faulty`

### Device Conditions
`New`, `Used`, `Faulty`

### Request Statuses
`Pending`, `Approved`, `Rejected`

## Benefits

1. **Single Source of Truth**: Change once, applies everywhere
2. **Backend Integration**: Easy to sync with database values
3. **No Inconsistencies**: Same values across all pages
4. **Easy Maintenance**: Add new values in one place
5. **Type Safety**: Import and use constants instead of strings

## How to Add New Values

1. Open `src/constants/index.js`
2. Add the new value to the appropriate array
3. Save the file
4. The new value appears everywhere automatically!

## Files Updated

- ✅ `src/constants/index.js` (NEW)
- ✅ `src/components/AddDevice.jsx`
- ✅ `src/components/FilterBar.jsx`
- ✅ `src/components/IssueDevice.jsx`
- ✅ `src/pages/staff/RequestDevice.jsx`
- ✅ `src/contexts/DevicesContext.jsx`
- ✅ `src/contexts/StaffRequestsContext.jsx`
