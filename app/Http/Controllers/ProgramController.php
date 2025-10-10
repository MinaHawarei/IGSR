<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use App\Models\Program;
use App\Models\Department;

class ProgramController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:programs.view')->only(['index','show']);
        $this->middleware('permission:programs.create')->only(['create','store']);
        $this->middleware('permission:programs.update')->only(['edit','update']);
        $this->middleware('permission:programs.delete')->only(['destroy']);
    }

    public function index()
    {
        $programs = Program::with('department')->get()->map(function($program) {
            return [
                'id' => $program->id,
                'code' => $program->code,
                'name' => [$program->name, $program->name_ar],
                'level' => $program->level,
                'description' => $program->description,
                'department' => $program->department?->name,
            ];
        });

        return Inertia::render('Programs/Index', [
            'programs' => $programs,
        ]);
    }

    public function create()
    {
        $departments = Department::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Programs/Create',[
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
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

            // Here you would typically create the Program
            Program::create($validated);

            return redirect()->route('programs.index')
                ->with('success', 'Program created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create Program. Please try again.');
        }
    }

    public function show($id)
    {
        $Program = Program::findOrFail($id);
        return Inertia::render('Programs/Show', [
            'Program' => $Program,
        ]);
    }

    public function edit($id)
    {
        $Program = Program::findOrFail($id);
        $departments = Department::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Programs/Edit', [
            'program' => $Program,
            'departments' => $departments,
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

            $program = Program::findOrFail($id);
            $program->update($validated);

            return redirect()->route('programs.show', $id)
                    ->with('success', 'Program updated successfully.');


        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update Program. Please try again.');
        }
    }

    public function destroy($id)
    {
        try {
                $Program = Program::findOrFail($id);
                $Program->delete();

                return redirect()->route('programs.index')
                    ->with('success', 'Program deleted successfully.');
            } catch (\Exception $e) {
                return redirect()->route('programs.index')
                    ->with('error', 'Failed to delete Program. Please try again.');
        }
    }
}


