<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class EnrollmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:enrollments.view')->only(['index','show']);
        $this->middleware('permission:enrollments.create')->only(['create','store']);
        $this->middleware('permission:enrollments.edit')->only(['edit','update']);
        $this->middleware('permission:enrollments.delete')->only(['destroy']);
    }

    public function index()
    {
        return Inertia::render('Enrollments/Index', [
            'enrollments' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('Enrollments/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required','integer'],
            'course_id' => ['required','integer'],
        ]);
        return redirect()->route('enrollments.index');
    }

    public function show($id)
    {
        return Inertia::render('Enrollments/Show', [
            'id' => (int) $id,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Enrollments/Edit', [
            'id' => (int) $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'user_id' => ['required','integer'],
            'course_id' => ['required','integer'],
        ]);
        return redirect()->route('enrollments.show', $id);
    }

    public function destroy($id)
    {
        return redirect()->route('enrollments.index');
    }
}


