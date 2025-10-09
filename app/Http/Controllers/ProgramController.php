<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;


class ProgramController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:programs.view')->only(['index','show']);
        $this->middleware('permission:programs.create')->only(['create','store']);
        $this->middleware('permission:programs.edit')->only(['edit','update']);
        $this->middleware('permission:programs.delete')->only(['destroy']);
    }

    public function index()
    {
        return Inertia::render('Programs/Index', [
            'programs' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('Programs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required','string','max:255'],
            'code' => ['required','string','max:50'],
        ]);
        return redirect()->route('programs.index');
    }

    public function show($id)
    {
        return Inertia::render('Programs/Show', [
            'id' => (int) $id,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Programs/Edit', [
            'id' => (int) $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => ['required','string','max:255'],
            'code' => ['required','string','max:50'],
        ]);
        return redirect()->route('programs.show', $id);
    }

    public function destroy($id)
    {
        return redirect()->route('programs.index');
    }
}


