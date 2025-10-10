<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Program extends Model
{
    protected $fillable = [
        'code',
        'name',
        'name_ar',
        'level',
        'department_id',
        'description',
    ];
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
