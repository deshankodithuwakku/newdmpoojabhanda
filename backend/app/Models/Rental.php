<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'product_id',
        'rental_date',
        'expected_return_date',
        'actual_return_date',
        'quantity',
        'total_amount',
        'deposit_amount',
        'status',
        'notes'
    ];

    protected $casts = [
        'rental_date' => 'date',
        'expected_return_date' => 'date',
        'actual_return_date' => 'date',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
