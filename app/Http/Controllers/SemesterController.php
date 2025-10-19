<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Semester;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;




class SemesterController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('permission:semesters.view')->only(['index','show']);
        $this->middleware('permission:semesters.manage')->only(['create','store','edit','update','destroy']);
    }

    public function index()
    {
        $semesters = Semester::get()->map(function($semester) {
            return [
                'id' => $semester->id,
                'name' => $semester->name,
                'start_date' => $semester->start_date,
                'end_date' => $semester->end_date,
                'status' => $semester->status,
            ];
        });

        return Inertia::render('Semesters/Index', [
            'semesters' => $semesters,
        ]);
    }

    public function create()
    {

        return Inertia::render('Semesters/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'start_date' => ['required', 'date'],
                'end_date' => ['required', 'date', 'after:start_date'],
                'status' => ['required', 'in:upcoming,active,completed'],
            ]);
             $exists = Semester::where('name', $validated['name'])->exists();
            if ($exists) {
                return redirect()->back()
                    ->withInput()
                    ->with('error', 'Semester already exists. Please choose another name.');
            }

            // Here you would typically create the semester
            Semester::create($validated);
            return redirect()->route('semesters.index')
                ->with('success', 'Semester created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create Semester. Please try again.');
        }
    }

    public function show($id)
    {
        $semester = Semester::findOrFail($id);
        return Inertia::render('Semesters/Show', [
            'semester' => $semester,
        ]);
    }

    public function edit($id)
    {
        $semester = Semester::findOrFail($id);

        return Inertia::render('Semesters/Edit', [
            'semester' => $semester,
        ]);

    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'code' => ['required', 'string', 'max:255'],
                'name' => ['required', 'string', 'max:255'],
                'name_ar' => ['required', 'string', 'max:255'],
                'level' => ['required', 'in:Bachelors,Diploma,Masters,PhD'],
                'department_id' => ['required', 'exists:departments,id'],
                'description' => ['nullable', 'string', 'max:255'],
            ]);

            $semester = Semester::findOrFail($id);
            $semester->update($validated);

            return redirect()->route('semesters.show', $id)
                    ->with('success', 'semester updated successfully.');


        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update semester. Please try again.');
        }
    }

    public function destroy($id)
    {
        try {
                $semester = Semester::findOrFail($id);
                $semester->delete();

                return redirect()->route('semesters.index')
                    ->with('success', 'semester deleted successfully.');
            } catch (\Exception $e) {
                return redirect()->route('semesters.index')
                    ->with('error', 'Failed to delete semester. Please try again.');
        }
    }
}
