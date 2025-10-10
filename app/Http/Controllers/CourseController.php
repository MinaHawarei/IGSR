<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use App\Models\Course;
use App\Models\Program;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:courses.view')->only(['index','show']);
        $this->middleware('permission:courses.create')->only(['create','store']);
        $this->middleware('permission:courses.update')->only(['edit','update']);
        $this->middleware('permission:courses.delete')->only(['destroy']);
    }

    public function index()
    {
        $courses = Course::with('program')->get()->map(function($course) {
            return [
                'id' => $course->id,
                'code' => $course->code,
                'name' => [$course->name, $course->name_ar],
                'name_ar' => $course->name_ar,
                'description' => $course->description,
                'credits' => $course->credits,
                'expiry' => $course->expiry,
                'program' => $course->program?->name,
            ];
        });
        return Inertia::render('Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function create()
    {
        $programs = Program::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Courses/Create',[
            'programs' => $programs,
        ]);
    }

    public function store(Request $request)
    {


        try {
            $validated = $request->validate([
                'code' => ['required', 'string', 'max:255'],
                'name' => ['required', 'string', 'max:255'],
                'name_ar' => ['required', 'string', 'max:255'],
                'credits' => ['required', 'numeric', 'min:0'],
                'expiry' => ['required', 'integer', 'min:1'],
                'program_id' => ['required', 'exists:programs,id'],
                'description' => ['nullable', 'string', 'max:255'],
            ]);

            // Here you would typically create the Program
            Course::create($validated);

            return redirect()->route('courses.index')
                ->with('success', 'Course created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create Course . Please try again.');
        }
    }

    public function show($id)
    {

        $Course = Course::findOrFail($id);
        return Inertia::render('Courses/Show', [
            'course' => $Course,
        ]);
    }

    public function edit($id)
    {

        $course = Course::findOrFail($id);
        $program = Program::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Courses/Edit', [
            'course' => $course,
            'programs' => $program,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:255'],
            'code' => ['required','string','max:50'],
        ]);
        return redirect()->route('courses.show', $id);
    }

    public function destroy($id)
    {
        return redirect()->route('courses.index');
    }
}
