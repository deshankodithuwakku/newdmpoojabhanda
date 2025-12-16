<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('daily_rate', 10, 2);
            $table->decimal('weekly_rate', 10, 2)->nullable();
            $table->decimal('monthly_rate', 10, 2)->nullable();
            $table->integer('quantity_available');
            $table->string('image')->nullable();
            $table->enum('status', ['available', 'rented', 'maintenance'])->default('available');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
