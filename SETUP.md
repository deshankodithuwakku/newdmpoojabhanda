# Rental Shop Setup Guide

## Backend Setup (Laravel)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create MySQL database:**
   ```sql
   CREATE DATABASE dmpoojabhanda;
   ```

3. **Configure database in `.env` file:**
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=dmpoojabhanda
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

4. **Run migrations:**
   ```bash
   php artisan migrate
   ```

5. **Start the server:**
   ```bash
   php artisan serve
   ```
   Server will run at: http://127.0.0.1:8000

## Frontend Setup (React)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   App will run at: http://localhost:3000

## API Endpoints

All endpoints are prefixed with `/api`

- **Products**: `/api/products` (GET, POST, PUT, DELETE)
- **Customers**: `/api/customers` (GET, POST, PUT, DELETE)
- **Rentals**: `/api/rentals` (GET, POST, PUT, DELETE)
- **Payments**: `/api/payments` (GET, POST, PUT, DELETE)

## Troubleshooting

If you get 404 errors:
1. Make sure Laravel server is running on port 8000
2. Restart the Laravel server after configuration changes
3. Check that routes are loaded: `php artisan route:list`

If you get CORS errors:
1. Verify `config/cors.php` has `http://localhost:3000` in allowed origins
2. Restart the Laravel server
