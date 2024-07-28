<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'task';

    protected $fillable = [
        'title',
        'content',
        'id_category'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'taskUser', 'id_task', 'id_user')
                    ->withPivot('done', 'blocked', 'finished')
                    ->withTimestamps();
    }
}
