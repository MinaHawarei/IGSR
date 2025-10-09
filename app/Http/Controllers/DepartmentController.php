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
        $this->middleware('permission:departments.edit')->only(['edit','update']);
        $this->middleware('permission:departments.delete')->only(['destroy']);
    }

    public function index()
    {
        return Inertia::render('Departments/Index', [
            'departments' => [],
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
        return Inertia::render('Departments/Show', [
            'id' => (int) $id,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Departments/Edit', [
            'id' => (int) $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => ['required','string','max:255'],
            'code' => ['required','string','max:50'],
        ]);
        return redirect()->route('departments.show', $id);
    }

    public function destroy($id)
    {
        return redirect()->route('departments.index');
    }
}


