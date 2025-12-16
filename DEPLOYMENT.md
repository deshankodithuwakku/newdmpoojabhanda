# Deployment Checklist for Hostinger

## Pre-Deployment Preparation

### 1. Database Setup on Hostinger
- [ ] Create MySQL database in Hostinger cPanel
- [ ] Note down database credentials:
  - Database name
  - Database username
  - Database password
  - Database host (usually `localhost`)

### 2. Domain Configuration
- [ ] Point domain/subdomain to Hostinger hosting
- [ ] Enable SSL certificate (free Let's Encrypt via cPanel)
- [ ] Note down your domain URLs:
  - Frontend: `https://yourdomain.com`
  - Backend API: `https://yourdomain.com/api` or `https://api.yourdomain.com`

## Backend Deployment (Laravel)

### 3. Prepare Backend Files Locally
- [ ] Update `backend/.env.production` with production credentials
- [ ] Test the configuration locally if possible
- [ ] Generate new APP_KEY if needed: `php artisan key:generate`
- [ ] Review all migration files in `backend/database/migrations/`

### 4. Upload Backend to Hostinger
**Directory Structure on Hostinger:**
```
/home/username/
├── public_html/              # Web-accessible directory
│   └── api/                  # Laravel public folder contents go here
│       ├── index.php
│       ├── .htaccess
│       └── storage -> ../../laravel/storage/app/public
└── laravel/                  # Laravel app files (outside public_html)
    ├── app/
    ├── bootstrap/
    ├── config/
    ├── database/
    ├── resources/
    ├── routes/
    ├── storage/
    └── vendor/
```

**Upload Steps:**
- [ ] Upload all backend files except `public` folder to `/home/username/laravel/`
- [ ] Upload contents of `backend/public/` to `/home/username/public_html/api/`
- [ ] Upload `.env.production` as `.env` to `/home/username/laravel/`

### 5. Configure Backend via SSH
Connect to Hostinger via SSH and run:

```bash
# Navigate to Laravel directory
cd ~/laravel

# Install dependencies (production only)
composer install --optimize-autoloader --no-dev

# Set proper permissions
chmod -R 755 storage bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache

# Run migrations
php artisan migrate --force

# Create storage symlink
php artisan storage:link

# Clear and cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Optimize for production
php artisan optimize
```

### 6. Update Backend .htaccess
- [ ] Verify `.htaccess` in `public_html/api/` has correct rewrite rules
- [ ] Update `index.php` if needed to point to correct Laravel installation path

**Update `public_html/api/index.php`:**
```php
require __DIR__.'/../../laravel/vendor/autoload.php';
$app = require_once __DIR__.'/../../laravel/bootstrap/app.php';
```

## Frontend Deployment (React)

### 7. Prepare Frontend for Production
- [ ] Update `frontend/.env.production` with production API URL
- [ ] Review API endpoints in your React components

### 8. Build React App
```bash
cd frontend
npm install
npm run build
```

### 9. Upload Frontend to Hostinger
- [ ] Upload contents of `frontend/build/` folder to `public_html/`
  - All files from `build/` go directly into `public_html/`
  - Do NOT upload the `build` folder itself

### 10. Configure Frontend .htaccess
Create/verify `.htaccess` in `public_html/` for React Router:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## Post-Deployment Verification

### 11. Test Backend API
- [ ] Test API endpoint: `https://yourdomain.com/api`
- [ ] Check database connection
- [ ] Test authentication endpoints
- [ ] Verify CORS settings are working

### 12. Test Frontend Application
- [ ] Visit `https://yourdomain.com`
- [ ] Test all major features
- [ ] Check browser console for errors
- [ ] Verify API calls are working
- [ ] Test authentication flow
- [ ] Check responsive design on mobile

### 13. Security & Performance
- [ ] Verify SSL certificate is active (HTTPS)
- [ ] Check that `.env` file is not publicly accessible
- [ ] Verify `APP_DEBUG=false` in production
- [ ] Test CORS configuration
- [ ] Enable Gzip compression in cPanel
- [ ] Set up daily database backups in cPanel
- [ ] Configure error logging

### 14. Monitoring Setup
- [ ] Set up error monitoring (optional: Sentry, Bugsnag)
- [ ] Configure Laravel logging to write to files
- [ ] Monitor disk space usage
- [ ] Set up uptime monitoring (optional: UptimeRobot)

## Common Issues & Solutions

### Issue: 500 Internal Server Error
- Check Laravel logs: `storage/logs/laravel.log`
- Verify file permissions (755 for directories, 644 for files)
- Check `.htaccess` configuration
- Verify PHP version (requires PHP 8.2+)

### Issue: CORS Errors
- Update `config/cors.php` with your frontend domain
- Add frontend URL to `SANCTUM_STATEFUL_DOMAINS` in `.env`

### Issue: Database Connection Failed
- Verify database credentials in `.env`
- Check if MySQL service is running
- Confirm database user has proper privileges

### Issue: 404 on API Routes
- Run `php artisan route:clear` and `php artisan route:cache`
- Check `.htaccess` in public directory
- Verify mod_rewrite is enabled

### Issue: React App Shows Blank Page
- Check browser console for errors
- Verify API URL in `.env.production`
- Check `.htaccess` for React Router support
- Clear browser cache

## Maintenance Commands

### Update Application Code
```bash
# Backend
cd ~/laravel
git pull origin main  # if using Git
composer install --no-dev
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan optimize

# Frontend (build locally and upload)
npm run build
# Upload build contents to public_html
```

### Clear Caches
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### View Logs
```bash
tail -f storage/logs/laravel.log
```

## Rollback Plan
- [ ] Keep backup of previous working version
- [ ] Document database schema changes
- [ ] Have database backup before migration
- [ ] Test rollback procedure

## Support Contacts
- **Hostinger Support:** [Your hosting panel]
- **Project Repository:** [Your Git repository URL]
- **Database Backups Location:** [cPanel backup location]
