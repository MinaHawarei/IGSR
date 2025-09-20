<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('grades', function (Blueprint $table) {
            $table->id();

            $table->foreignId('enrollment_id')->constrained('enrollments')->cascadeOnDelete();
            $table->decimal('grade', 5, 2)->nullable();
            $table->string('letter_grade')->nullable(); // e.g., A, B, C, etc
            $table->string('remarks')->nullable(); // e.g., Excellent, Good, etc

            $table->enum('status', ['in_progress', 'completed', 'failed'])->default('in_progress');




            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
