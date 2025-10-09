<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;


class LiveClassController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:live_classes.view')->only(['index','show']);
        $this->middleware('permission:live_classes.create')->only(['create','store']);
        $this->middleware('permission:live_classes.edit')->only(['edit','update']);
        $this->middleware('permission:live_classes.delete')->only(['destroy']);
    }

    public function index()
    {
        return Inertia::render('LiveClasses/Index', [
            'liveClasses' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('LiveClasses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:255'],
        ]);
        return redirect()->route('live-classes.index');
    }

    public function show($id)
    {
        return Inertia::render('LiveClasses/Show', [
            'id' => (int) $id,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('LiveClasses/Edit', [
            'id' => (int) $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:255'],
        ]);
        return redirect()->route('live-classes.show', $id);
    }

    public function destroy($id)
    {
        return redirect()->route('live-classes.index');
    }
}


