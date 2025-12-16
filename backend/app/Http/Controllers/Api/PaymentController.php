<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        return response()->json(Payment::with('rental')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rental_id' => 'required|exists:rentals,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,card,bank_transfer,other',
            'payment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $payment = Payment::create($validated);
        return response()->json($payment->load('rental'), 201);
    }

    public function show(Payment $payment)
    {
        return response()->json($payment->load('rental'));
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'rental_id' => 'required|exists:rentals,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,card,bank_transfer,other',
            'payment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $payment->update($validated);
        return response()->json($payment->load('rental'));
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return response()->json(null, 204);
    }
}
