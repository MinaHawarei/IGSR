<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\Student\CourseController as StudentCourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\LiveClassController;
use App\Http\Controllers\CourseDashboardController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\CourseOfferingController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('departments', DepartmentController::class);
    Route::resource('programs', ProgramController::class);
    Route::resource('courses', StudentCourseController::class);
    Route::resource('admin-courses', CourseController::class);
    Route::resource('CourseOffering', CourseOfferingController::class);
    Route::resource('semesters', SemesterController::class);
    Route::resource('enrollments', EnrollmentController::class);
    Route::resource('grades', GradeController::class);
    Route::resource('lessons', LessonController::class);
    Route::resource('assignments', AssignmentController::class);
    Route::resource('exams', ExamController::class);
    Route::resource('live-classes', LiveClassController::class);


    Route::prefix('courses-dashboard')->name('coursesDashboard.')->group(function () {
        Route::get('/', [CourseDashboardController::class, 'index'])->name('index'); // عرض الأقسام والبرامج
        Route::get('/all/{program}/courses', [CourseController::class, 'index'])->name('all'); // عرض كل الكورسات
        Route::get('/programs/{program}/active-courses', [CourseOfferingController::class, 'index'])->name('all'); // عرض كل الكورسات
        Route::get('/programs/{program}/offerings', [CourseOfferingController::class, 'index'])->name('all'); // عرض كل الكورسات
        Route::get('/active', [CourseDashboardController::class, 'activeCourses'])->name('active'); // عرض الكورسات المفعلة فقط
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
