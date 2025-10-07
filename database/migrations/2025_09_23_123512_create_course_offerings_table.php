<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_offerings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('semester_id')->constrained()->cascadeOnDelete();
            $table->integer('capacity');
            $table->integer('enrolled_count')->default(0);
            $table->string('status')->default('open'); // open/closed
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_offerings');
    }
};
