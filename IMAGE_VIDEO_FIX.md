# Image and Video URL Fix - Deployment Guide

## What Was Fixed
All image and video URLs were hardcoded to `http://localhost:8000/storage/...`, which worked locally but broke on the live site.

## Changes Made

### 1. Created Storage URL Helper (`src/api/api.js`)
```javascript
export const getStorageUrl = (path) => {
  if (!path) return '';
  return `${API_BASE_URL}/storage/${path}`;
};
```

### 2. Updated All Component Files
- **Products.js**: Updated 4 locations (existing images, existing videos, product list images, product list videos)
- **ProductDetail.js**: Updated 3 locations (main image, thumbnails, videos)
- **Home.js**: Updated 1 location (product card images)

### 3. Environment Configuration
The `.env.production` file already contains:
```
REACT_APP_API_URL=https://dmpoojabhanda.lk/backend/public
```

## Deployment Steps

### 1. Build the Frontend (Already Completed)
```bash
cd frontend
npm run build
```

### 2. Deploy to Live Server
Upload the contents of `frontend/build` folder to your live server's web directory.

### 3. Verify Backend Storage is Accessible
Make sure your Laravel backend has the storage link created:
```bash
cd backend
php artisan storage:link
```

### 4. Check File Permissions
Ensure the storage directories have proper permissions:
```bash
chmod -R 755 storage
chmod -R 755 public/storage
```

### 5. Test on Live Site
- Visit your live site
- Navigate to a product detail page
- Verify images and videos are loading correctly
- Check browser console (F12) for any errors

## How It Works Now

### Before (Hardcoded):
```javascript
<img src={`http://localhost:8000/storage/${image}`} />
```

### After (Dynamic):
```javascript
<img src={getStorageUrl(image)} />
```

The `getStorageUrl()` function automatically uses:
- **Production**: `https://dmpoojabhanda.lk/backend/public/storage/${image}`
- **Development**: `http://localhost:8000/storage/${image}`

## Troubleshooting

### If images still don't show:
1. Check the environment variable is set correctly in `.env.production`
2. Rebuild the frontend: `npm run build`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Verify storage link exists on server: `ls -la public/storage`
5. Check file paths in database match actual files in storage

### If videos don't play:
1. Verify video file formats are supported (mp4 is most compatible)
2. Check video file size (large videos may need streaming setup)
3. Ensure MIME types are configured correctly on web server

## File Locations
- Helper function: `frontend/src/api/api.js`
- Environment config: `frontend/.env.production`
- Updated components:
  - `frontend/src/pages/Products.js`
  - `frontend/src/pages/ProductDetail.js`
  - `frontend/src/pages/Home.js`
