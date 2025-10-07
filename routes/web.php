<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CourseController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

     // Courses routes as example
    Route::get('/admin/courses', [CourseController::class, 'index'])
        ->name('courses.index')
        ->middleware('permission:courses.view');

    Route::get('/admin/courses/create', [CourseController::class, 'create'])
        ->name('courses.create')
        ->middleware('permission:courses.create');

    Route::post('/admin/courses', [CourseController::class, 'store'])
        ->name('courses.store')
        ->middleware('permission:courses.create');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
