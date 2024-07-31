<?php

use Illuminate\Support\Facades\Route;


Route::prefix('/users')->group(base_path('routes/api/user.php'));

Route::prefix('/tasks')->group(base_path('routes/api/task.php'));

Route::prefix('/auth')->group(base_path('routes/api/auth.php'));
