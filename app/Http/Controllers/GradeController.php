<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;


class GradeController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:grades.view')->only(['index','show']);
        $this->middleware('permission:grades.create')->only(['create','store']);
        $this->middleware('permission:grades.edit')->only(['edit','update']);
        $this->middleware('permission:grades.delete')->only(['destroy']);
    }

    public function index()
    {
        return Inertia::render('Grades/Index', [
            'grades' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('Grades/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student' => ['required','string','max:255'],
            'course' => ['required','string','max:255'],
            'grade' => ['required','string','max:10'],
        ]);
        return redirect()->route('grades.index');
    }

    public function show($id)
    {
        return Inertia::render('Grades/Show', [
            'id' => (int) $id,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Grades/Edit', [
            'id' => (int) $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'student' => ['required','string','max:255'],
            'course' => ['required','string','max:255'],
            'grade' => ['required','string','max:10'],
        ]);
        return redirect()->route('grades.show', $id);
    }

    public function destroy($id)
    {
        return redirect()->route('grades.index');
    }
}


