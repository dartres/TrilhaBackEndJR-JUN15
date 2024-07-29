<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'content',
        'done',
        'finished_at',
        'id_category',
        'id_user'
    ];

    protected $casts = [
        'finished' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }

    public function users()
    {
         return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
