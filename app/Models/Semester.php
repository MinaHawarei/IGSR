<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Semester extends Model
{
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'status',
    ];


}
