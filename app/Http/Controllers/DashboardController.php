<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        switch ($user->role) {
            case 'student':
                return Inertia::render('student/dashboard');
            case 'professor':
                return Inertia::render('professor/dashboard');
            case 'staff':
                return Inertia::render('staff/dashboard');
            case 'admin':
                return Inertia::render('admin/dashboard');
            default:
                return Inertia::render('welcome'); // fallback
        }
    }
}
