<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskUserController;

// http://127.0.0.1:8000/tasks
Route::middleware('jwt.auth')->get('/', [TaskUserController::class, 'index']);
Route::middleware('jwt.auth')->post('/create', [TaskUserController::class, 'store']);
Route::middleware('jwt.auth')->get('/read/{id}', [TaskUserController::class, 'show']);
Route::middleware('jwt.auth')->get('/readByUser/{id_user}', [TaskUserController::class, 'showTasksByUser']);
Route::middleware('jwt.auth')->put('/status', [TaskUserController::class, 'updateTaskStatus']);
