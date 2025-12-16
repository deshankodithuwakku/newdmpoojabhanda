# Rental Shop Management System

A full-stack rental shop management application built with React.js frontend and Laravel backend.

## Features

- **Product Management**: Add, edit, and manage rental products with categories
- **Customer Management**: Store and manage customer information
- **Rental Tracking**: Create and track rentals with status monitoring
- **Payment Processing**: Record payments for rentals
- **Category Management**: Organize products by categories

## Tech Stack

- **Frontend**: React.js
- **Backend**: Laravel
- **Database**: MySQL

## Prerequisites

- Node.js (v14 or higher)
- PHP (v8.1 or higher)
- Composer
- MySQL Server

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Create a MySQL database named `rental_shop`

4. Update the `.env` file with your database credentials:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=rental_shop
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

5. Run migrations to create database tables:
   ```bash
   php artisan migrate
   ```

6. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   The backend will run at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will run at http://localhost:3000

## Usage

1. Start the MySQL server
2. Run the Laravel backend server (`php artisan serve`)
3. Run the React frontend server (`npm start`)
4. Access the application at http://localhost:3000

## API Endpoints

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create a category
- GET `/api/categories/{id}` - Get a specific category
- PUT `/api/categories/{id}` - Update a category
- DELETE `/api/categories/{id}` - Delete a category

### Products
- GET `/api/products` - Get all products
- POST `/api/products` - Create a product
- GET `/api/products/{id}` - Get a specific product
- PUT `/api/products/{id}` - Update a product
- DELETE `/api/products/{id}` - Delete a product

### Customers
- GET `/api/customers` - Get all customers
- POST `/api/customers` - Create a customer
- GET `/api/customers/{id}` - Get a specific customer
- PUT `/api/customers/{id}` - Update a customer
- DELETE `/api/customers/{id}` - Delete a customer

### Rentals
- GET `/api/rentals` - Get all rentals
- POST `/api/rentals` - Create a rental
- GET `/api/rentals/{id}` - Get a specific rental
- PUT `/api/rentals/{id}` - Update a rental
- DELETE `/api/rentals/{id}` - Delete a rental

### Payments
- GET `/api/payments` - Get all payments
- POST `/api/payments` - Create a payment
- GET `/api/payments/{id}` - Get a specific payment
- PUT `/api/payments/{id}` - Update a payment
- DELETE `/api/payments/{id}` - Delete a payment

## Database Schema

### Categories Table
- id
- name
- description
- timestamps

### Products Table
- id
- name
- description
- category_id (foreign key)
- daily_rate
- weekly_rate
- monthly_rate
- quantity_available
- image
- status (available, rented, maintenance)
- timestamps

### Customers Table
- id
- name
- email
- phone
- address
- id_number
- timestamps

### Rentals Table
- id
- customer_id (foreign key)
- product_id (foreign key)
- rental_date
- expected_return_date
- actual_return_date
- quantity
- total_amount
- deposit_amount
- status (active, completed, overdue, cancelled)
- notes
- timestamps

### Payments Table
- id
- rental_id (foreign key)
- amount
- payment_method (cash, card, bank_transfer, other)
- payment_date
- notes
- timestamps

## License

MIT License
