<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $perms = [
        'departments.view', 'departments.create', 'departments.update', 'departments.delete',
        'programs.view', 'programs.create', 'programs.update', 'programs.delete',
        'courses.view', 'courses.create', 'courses.update', 'courses.delete',
        'course_offerings.manage',
        'lessons.manage', 'assignments.manage', 'exams.manage',
        'grading.grade', 'grading.view',
        'enrollment.enroll', 'enrollment.drop',
        'live_classes.manage',
        ];
        foreach ($perms as $p) Permission::findOrCreate($p);

        $superAdmin     = Role::findOrCreate('superAdmin');
        $admin     = Role::findOrCreate('admin');
        $professor = Role::findOrCreate('professor');
        $teachingStaff = Role::findOrCreate('teachingStaff');
        $staff = Role::findOrCreate('staff');
        $student   = Role::findOrCreate('student');

        // ربط صلاحيات بالأدوار
        $superAdmin->givePermissionTo(Permission::all());
        $admin->givePermissionTo(Permission::all());
        $professor->givePermissionTo(['lessons.manage','assignments.manage','exams.manage','grading.grade','grading.view','live_classes.manage']);
        $teachingStaff->givePermissionTo(['lessons.manage','assignments.manage','exams.manage','grading.grade','grading.view','live_classes.manage']);
        $staff->givePermissionTo(['lessons.manage','assignments.manage','exams.manage','grading.grade','grading.view','live_classes.manage']);
        $student->givePermissionTo(['courses.view','grading.view','enrollment.enroll','enrollment.drop']);
    }
}
