<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\RentalController;
use App\Http\Controllers\Api\PaymentController;

// Public Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Authentication Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

// Public API Routes (no authentication required)
Route::apiResource('products', ProductController::class);
Route::apiResource('customers', CustomerController::class);
Route::apiResource('rentals', RentalController::class);
Route::apiResource('payments', PaymentController::class);
