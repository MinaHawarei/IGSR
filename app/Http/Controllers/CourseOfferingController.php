<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use App\Models\CourseOffering;
use App\Models\Program;

class CourseOfferingController extends Controller
{
        public function __construct()
    {
        $this->middleware('permission:course_offerings.manage')->only(['index','show','create','store','edit','update','destroy']);

    }

    public function index()
    {
        $courses = CourseOffering::with(['course', 'semester'])
            ->get()
            ->map(function ($offering) {
                return [
                    'id' => $offering->id,
                    'course_name' => [$offering->course->code, $offering->course->name, $offering->course->name_ar],
                    'semester_name' => $offering->semester->name ?? 'N/A',
                    'capacity' => $offering->capacity,
                    'enrolled_count' => $offering->enrolled_count,
                    'status' => $offering->status,
                ];
            });
            return Inertia::render('CourseOffering/Index', [
            'courses' => $courses,
        ]);
    }

    public function create()
    {
        $programs = Program::orderBy('name')->get(['id', 'name']);

        return Inertia::render('CourseOffering/Create',[
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
            CourseOffering::create($validated);

            return redirect()->route('CourseOffering.index')
                ->with('success', 'Course created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create Course . Please try again.');
        }
    }

    public function show($id)
    {

        $Course = CourseOffering::findOrFail($id);
        return Inertia::render('CourseOffering/Show', [
            'course' => $Course,
        ]);
    }

    public function edit($id)
    {

        $course = CourseOffering::findOrFail($id);
        $program = Program::orderBy('name')->get(['id', 'name']);

        return Inertia::render('CourseOffering/Edit', [
            'course' => $course,
            'programs' => $program,
        ]);
    }

        public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'title' => ['required','string','max:255'],
                'code' => ['required','string','max:50'],
            ]);
            $course = CourseOffering::findOrFail($id);
            $course->update($validated);
            return redirect()->route('CourseOffering.show', $id)
             ->with('success', 'Course updated successfully.');

        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update Course. Please try again.');
        }
    }

    public function destroy($id)
    {
        try {
            $course = CourseOffering::findOrFail($id);
            $course->delete();
            return redirect()->route('CourseOffering.index')
             ->with('success', 'Course deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete Course. Please try again.');
        }
    }
}
