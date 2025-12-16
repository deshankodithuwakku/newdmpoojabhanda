<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rental;
use Illuminate\Http\Request;

class RentalController extends Controller
{
    public function index()
    {
        return response()->json(Rental::with(['customer', 'product', 'payments'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'product_id' => 'required|exists:products,id',
            'rental_date' => 'required|date',
            'expected_return_date' => 'required|date|after:rental_date',
            'quantity' => 'required|integer|min:1',
            'total_amount' => 'required|numeric|min:0',
            'deposit_amount' => 'nullable|numeric|min:0',
            'status' => 'nullable|in:active,completed,overdue,cancelled',
            'notes' => 'nullable|string',
        ]);

        $rental = Rental::create($validated);
        return response()->json($rental->load(['customer', 'product']), 201);
    }

    public function show(Rental $rental)
    {
        return response()->json($rental->load(['customer', 'product', 'payments']));
    }

    public function update(Request $request, Rental $rental)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'product_id' => 'required|exists:products,id',
            'rental_date' => 'required|date',
            'expected_return_date' => 'required|date|after:rental_date',
            'actual_return_date' => 'nullable|date',
            'quantity' => 'required|integer|min:1',
            'total_amount' => 'required|numeric|min:0',
            'deposit_amount' => 'nullable|numeric|min:0',
            'status' => 'nullable|in:active,completed,overdue,cancelled',
            'notes' => 'nullable|string',
        ]);

        $rental->update($validated);
        return response()->json($rental->load(['customer', 'product', 'payments']));
    }

    public function destroy(Rental $rental)
    {
        $rental->delete();
        return response()->json(null, 204);
    }
}
