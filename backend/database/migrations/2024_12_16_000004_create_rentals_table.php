<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rentals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->date('rental_date');
            $table->date('expected_return_date');
            $table->date('actual_return_date')->nullable();
            $table->integer('quantity')->default(1);
            $table->decimal('total_amount', 10, 2);
            $table->decimal('deposit_amount', 10, 2)->default(0);
            $table->enum('status', ['active', 'completed', 'overdue', 'cancelled'])->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rentals');
    }
};
