<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class ExamController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:exams.view')->only(['index','show']);
        $this->middleware('permission:exams.create')->only(['create','store']);
        $this->middleware('permission:exams.edit')->only(['edit','update']);
        $this->middleware('permission:exams.delete')->only(['destroy']);
    }

    public function index()
    {
        return Inertia::render('Exams/Index', [
            'exams' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('Exams/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:255'],
        ]);
        return redirect()->route('exams.index');
    }

    public function show($id)
    {
        return Inertia::render('Exams/Show', [
            'id' => (int) $id,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Exams/Edit', [
            'id' => (int) $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:255'],
        ]);
        return redirect()->route('exams.show', $id);
    }

    public function destroy($id)
    {
        return redirect()->route('exams.index');
    }
}


