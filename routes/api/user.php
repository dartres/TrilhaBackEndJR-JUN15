<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmailController;

Route::post('/validate', [UserController::class, 'index']);
Route::middleware('jwt.auth')->delete('/delete', [UserController::class, 'destroy']);
Route::middleware('jwt.auth')->put('/update', [UserController::class, 'update']);
Route::middleware('jwt.auth')->get('/search/{value}', [UserController::class, 'search']);
