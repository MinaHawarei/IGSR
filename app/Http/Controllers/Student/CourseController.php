<?php

namespace App\Http\Controllers\Student;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use App\Models\Course;
use App\Models\Program;
use App\Models\CourseOffering;


class CourseController extends Controller
{
     public function __construct()
    {
        $this->middleware('permission:enrollment.enroll')->only(['index','show','create','store','edit','update']);
        $this->middleware('permission:enrollment.drop')->only(['destroy']);
    }

    public function index()
    {
        $courses = CourseOffering::with(['course', 'semester'])
            ->where('status', 'open')
            ->get()
            ->map(function ($offering) {
                return [
                    'id' => $offering->id,
                    'course_name' => [$offering->course->code, $offering->course->name, $offering->course->name_ar],
                    'capacity' => $offering->capacity,
                    'enrolled_count' => $offering->enrolled_count,
                    'available_seats' => $offering->capacity - $offering->enrolled_count,
                ];
            });
        return Inertia::render('StudentCourses/Index', [
            'courses' => $courses,
        ]);
    }
}
