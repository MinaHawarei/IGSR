<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:courses.view')->only(['index','show']);
        $this->middleware('permission:courses.create')->only(['create','store']);
        $this->middleware('permission:courses.edit')->only(['edit','update']);
        $this->middleware('permission:courses.delete')->only(['destroy']);
    }

    public function index()
    {

        return Inertia::render('Courses/Index', [
            'courses' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('Courses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:255'],
            'code' => ['required','string','max:50'],
        ]);
        return redirect()->route('courses.index');
    }

    public function show($id)
    {
        return Inertia::render('Courses/Show', [
            'id' => (int) $id,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Courses/Edit', [
            'id' => (int) $id,
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
