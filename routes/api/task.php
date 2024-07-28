<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

// http://127.0.0.1:8000/tasks
Route::middleware('jwt.auth')->get('/', [TaskController::class, 'index']);
Route::middleware('jwt.auth')->post('/create', [TaskController::class, 'store']);
Route::middleware('jwt.auth')->get('/read/{id}', [TaskController::class, 'show']);
Route::middleware('jwt.auth')->put('/update/{id}', [TaskController::class, 'update']);
Route::middleware('jwt.auth')->delete('/delete/{id}', [TaskController::class, 'destroy']);
Route::middleware('jwt.auth')->get('/search/{value}', [TaskController::class, 'search']);
