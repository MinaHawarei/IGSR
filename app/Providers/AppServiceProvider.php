<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Spatie\Permission\PermissionRegistrar;

class AppServiceProvider extends ServiceProvider

{

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {


        Inertia::share([
            'user' => function () {
                $user = Auth::user();
                if (!$user) return null;

                return [
                    'id'        => $user->id,
                    'name'      => $user->name,
                    'user_name' => $user->user_name,
                ];
            },

            'capabilities' => function () {
                $user = Auth::user();
                if (!$user) return [];

                $cacheKey = "capabilities:{$user->id}";

                return Cache::remember($cacheKey, now()->addMinutes(10), function () use ($user) {
                    $roles = $user->getRoleNames()->values()->all();
                    $permissions = $user->getAllPermissions()->pluck('name')->values()->all();

                    $widgets = [
                        'admin.user_stats'        => $user->hasRole('admin') || $user->can('users.view'),
                        'professor.to_grade'      => $user->can('grading.grade'),
                        'student.my_enrollments'  => $user->can('enrollment.enroll'),
                        'common.live_classes'     => $user->can('live_classes.manage') || $user->hasRole('student'),
                    ];

                    $widgets = array_keys(array_filter($widgets));

                    return compact('roles', 'permissions', 'widgets');
                });
            },
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                ];
            },
        ]);

    }

    /**
     * ⚙️ مساعد لمسح الكاش عند تعديل الصلاحيات
     */
    public static function clearCapabilitiesCacheFor(int $userId): void
    {
        Cache::forget("capabilities:{$userId}");
        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
