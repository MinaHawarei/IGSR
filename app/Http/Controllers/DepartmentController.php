<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use App\Models\Department;


class DepartmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:departments.view')->only(['index','show']);
        $this->middleware('permission:departments.create')->only(['create','store']);
        $this->middleware('permission:departments.update')->only(['edit','update']);
        $this->middleware('permission:departments.delete')->only(['destroy']);
    }

    public function index()
    {
        return Inertia::render('Departments/Index', [
            'departments' => Department::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Departments/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required','string','max:255'],
                'name_ar' => ['required','string','max:255'],
                'description' => ['nullable','string','max:255'],
            ]);

            // Here you would typically create the department
            Department::create($validated);

            return redirect()->route('departments.index')
                ->with('success', 'Department created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create department. Please try again.');
        }
    }

    public function show($id)
    {
            $department = Department::findOrFail($id);

        return Inertia::render('Departments/Show', [
            'department' => $department,
        ]);
    }

    public function edit($id)
    {
        $department = Department::findOrFail($id);

        return Inertia::render('Departments/Edit', [
            'department' => $department,
        ]);

    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => ['required','string','max:255'],
                'name_ar' => ['required','string','max:50'],
                'description' => ['nullable','string','max:255'],

            ]);

            $department = Department::findOrFail($id);
            $department->update($validated);

            return redirect()->route('departments.show', $id)
                    ->with('success', 'Department updated successfully.');


        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update department. Please try again.');
        }
    }

    public function destroy($id)
    {
        try {
            $department = Department::findOrFail($id);
            $department->delete();

            return redirect()->route('departments.index')
                ->with('success', 'Department deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('departments.index')
                ->with('error', 'Failed to delete department. Please try again.');
        }
    }
}


