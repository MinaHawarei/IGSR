<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseOffering extends Model
{
    protected $fillable = [
        'course_id',
        'semester_id',
        'capacity',
        'enrolled_count',
        'status',
    ];
    protected $casts = [
        'capacity' => 'integer',
        'enrolled_count' => 'integer',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
    public function semester()
    {
        return $this->belongsTo(Semester::class, 'semester_id');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }

    public function scopeClosed($query)
    {
        return $query->where('status', 'closed');
    }

    // هل فيه أماكن فاضية؟
    public function hasSpace(): bool
    {
        return $this->enrolled_count < $this->capacity;
    }


}
