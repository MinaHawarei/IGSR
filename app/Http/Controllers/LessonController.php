<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;


class LessonController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:lessons.view')->only(['index','show']);
        $this->middleware('permission:lessons.create')->only(['create','store']);
        $this->middleware('permission:lessons.edit')->only(['edit','update']);
        $this->middleware('permission:lessons.delete')->only(['destroy']);
    }

    public function index()
    {
        return Inertia::render('Lessons/Index', [
            'lessons' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('Lessons/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:255'],
        ]);
        return redirect()->route('lessons.index');
    }

    public function show($id)
    {
        return Inertia::render('Lessons/Show', [
            'id' => (int) $id,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Lessons/Edit', [
            'id' => (int) $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:255'],
        ]);
        return redirect()->route('lessons.show', $id);
    }

    public function destroy($id)
    {
        return redirect()->route('lessons.index');
    }
}


