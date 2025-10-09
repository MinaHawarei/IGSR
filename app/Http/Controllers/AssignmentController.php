<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;


class AssignmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:assignments.view')->only(['index','show']);
        $this->middleware('permission:assignments.create')->only(['create','store']);
        $this->middleware('permission:assignments.edit')->only(['edit','update']);
        $this->middleware('permission:assignments.delete')->only(['destroy']);
    }

    public function index()
    {
        return Inertia::render('Assignments/Index', [
            'assignments' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('Assignments/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:255'],
        ]);
        return redirect()->route('assignments.index');
    }

    public function show($id)
    {
        return Inertia::render('Assignments/Show', [
            'id' => (int) $id,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Assignments/Edit', [
            'id' => (int) $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:255'],
        ]);
        return redirect()->route('assignments.show', $id);
    }

    public function destroy($id)
    {
        return redirect()->route('assignments.index');
    }
}


