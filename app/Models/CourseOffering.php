<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseOffering extends Model
{
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

}
