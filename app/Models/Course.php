<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Course extends Model
{
     protected $fillable = [
        'code',
        'name',
        'description',
        'credits',
        'program_id',
    ];
       /**
     * Course belongs to a Program
     */
    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * A course can have many professors (via pivot table course_professor)
     */
    public function professors()
    {
        return $this->belongsToMany(User::class, 'course_professor', 'course_id', 'professor_id');
    }

    /**
     * A course can be offered many times (different semesters)
     */
    public function offerings()
    {
        return $this->hasMany(CourseOffering::class);
    }

    /**
     * A course can have many enrollments (students registered)
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
