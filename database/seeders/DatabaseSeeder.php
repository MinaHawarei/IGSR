<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // تأكد إن الرولز موجودة قبل المستخدمين
        $this->call([
            PermissionSeeder::class,
        ]);

        $users = [
            [
                'name' => 'Super Admin User',
                'user_name' => '1404-1-269',
                'email' => 'super@example.com',
                'role' => 'superAdmin',
            ],
            [
                'name' => 'Admin User',
                'user_name' => '1404-1-270',
                'email' => 'admin@example.com',
                'role' => 'admin',
            ],
            [
                'name' => 'Professor User',
                'user_name' => '1404-1-271',
                'email' => 'professor@example.com',
                'role' => 'professor',
            ],
            [
                'name' => 'Teaching Staff User',
                'user_name' => '1404-1-272',
                'email' => 'teachingStaff@example.com',
                'role' => 'teachingStaff',
            ],
            [
                'name' => 'Staff User',
                'user_name' => '1404-1-273',
                'email' => 'staff@example.com',
                'role' => 'staff',
            ],
            [
                'name' => 'Student User',
                'user_name' => '1404-1-274',
                'email' => 'student@example.com',
                'role' => 'student',
            ],
        ];

        foreach ($users as $u) {
            // إنشاء المستخدم (بدون عمود role)
            $user = User::firstOrCreate(
                ['email' => $u['email']],
                [
                    'name' => $u['name'],
                    'user_name' => $u['user_name'],
                    'status' => 'active',
                    'password' => Hash::make('123456789'),
                    'email_verified_at' => now(),
                ]
            );

            $role = Role::where('name', $u['role'])->first();
            if ($role) {
                $user->syncRoles([$role->name]);
            }
        }
    }
}
