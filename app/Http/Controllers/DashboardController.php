<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Spatie\Permission\PermissionRegistrar;

use Illuminate\Routing\Controller as BaseController;

class DashboardController extends BaseController
{
    public function __construct()
    {
        $this->middleware(['auth']); // , 'verified'
    }

    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('dashboard', [
            'user' => [
                'id'        => $user->id,
                'name'      => $user->name,
                'user_name' => $user->user_name,
            ],

        ]);
    }

    /**
     * يحسب قدرات المستخدم ويكاشّيها لفترة قصيرة
     */
    protected function capabilitiesFor($user): array
    {
        $cacheKey = "capabilities:{$user->id}";

        return Cache::remember($cacheKey, now()->addMinutes(10), function () use ($user) {
            // أدوار وأذونات كـ arrays جاهزة للـ Inertia/JS
            $roles = $user->getRoleNames()->values()->all();                  // ["admin", "student", ...]
            $permissions = $user->getAllPermissions()->pluck('name')->values()->all(); // ["courses.view", "grading.grade", ...]

            // حدّد أي Widgets تظهر
            // (هنظبطها ونوسّعها لاحقًا حسب احتياجك الحقيقي)
            $widgets = [
                'admin.user_stats'        => $user->hasRole('admin') || $user->can('users.view'),
                'professor.to_grade'      => $user->can('grading.grade'),
                'student.my_enrollments'  => $user->can('enrollment.enroll'),
                'common.live_classes'     => $user->can('live_classes.manage') || $user->hasRole('student'),
            ];

            // خُد المفاتيح اللي قيمتها true فقط
            $widgets = array_keys(array_filter($widgets));

            return compact('roles', 'permissions', 'widgets');
        });
    }

    /**
     * امسح كاش القدرات + كاش Spatie (نادِها بعد أي تغيير للأدوار/الصلاحيات).
     */
    public static function clearCapabilitiesCacheFor(int $userId): void
    {
        Cache::forget("capabilities:{$userId}");
        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
