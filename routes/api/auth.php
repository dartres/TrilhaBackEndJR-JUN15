<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

http://127.0.0.1:8000/api/auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('jwt.auth')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('jwt.auth')->post('/refresh', [AuthController::class, 'refresh']);
Route::middleware('jwt.auth')->post('/me', [AuthController::class, 'me']);
