# Clear localStorage Instructions

## Issue
If you're seeing "Device Type" instead of "Device Category" in the Requests page, it's because you have old data in localStorage with the old field name (`deviceName` instead of `deviceCategory`).

## Solution 1: Automatic Migration (Recommended)
The app now automatically migrates old data when it loads. Simply:
1. Refresh your browser (F5 or Ctrl+R)
2. The old data will be automatically converted
3. Check the browser console for "Migrating old request data" messages

## Solution 2: Clear localStorage Manually

### Option A: Clear All Data (Fresh Start)
1. Open your browser's Developer Tools (F12)
2. Go to the "Console" tab
3. Type this command and press Enter:
```javascript
localStorage.clear(); location.reload();
```
4. This will clear all data and refresh the page

### Option B: Clear Only Requests
1. Open your browser's Developer Tools (F12)
2. Go to the "Console" tab
3. Type this command and press Enter:
```javascript
localStorage.removeItem('staffRequests'); location.reload();
```
4. This will clear only request data and refresh the page

### Option C: Using Application Tab
1. Open Developer Tools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Expand "Local Storage" in the left sidebar
4. Click on your domain
5. Find "staffRequests" and delete it
6. Refresh the page

## Verify the Fix

After clearing/migrating:
1. Go to `/staff-dashboard`
2. Submit a new device request
3. Go to `/requests` (admin page)
4. You should now see "Device Category" column header
5. The data should show the category (e.g., "Laptop", "Printer")

## What Changed

### Old Data Structure:
```json
{
  "deviceName": "HP EliteBook Laptop",
  "requesterName": "John Doe",
  "ministry": "Ministry Of Finance"
}
```

### New Data Structure:
```json
{
  "deviceCategory": "Laptop",
  "requesterName": "John Doe",
  "ministry": "Ministry Of Finance"
}
```

## Migration Details

The app now includes automatic migration code that:
1. Checks if old data has `deviceName` field
2. Converts `deviceName` to `deviceCategory`
3. Removes the old `deviceName` field
4. Saves the migrated data back to localStorage
5. Logs migration activity to console

## Still Having Issues?

If you still see "Device Type" after trying the above:

1. **Hard Refresh**: Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Check Console**: Look for any error messages
3. **Verify Code**: Make sure the latest code is running
4. **Clear Browser Cache**: 
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Select "Cached images and files"
   - Click "Clear data"

## Prevention

To avoid this issue in the future:
- The migration code will handle old data automatically
- New requests will always use `deviceCategory`
- Old requests will be converted on first load
