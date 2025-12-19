<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'daily_rate',
        'weekly_rate',
        'monthly_rate',
        'quantity_available',
        'image',
        'images',
        'videos',
        'status'
    ];

    protected $casts = [
        'images' => 'array',
        'videos' => 'array',
    ];

    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }
}
