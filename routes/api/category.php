<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

// http://127.0.0.1:8000/categories
Route::middleware('jwt.auth')->get('/', [CategoryController::class, 'index']);
Route::middleware('jwt.auth')->post('/create', [CategoryController::class, 'store']);
Route::middleware('jwt.auth')->get('/read/{id}', [CategoryController::class, 'show']);
Route::middleware('jwt.auth')->put('/update/{id}', [CategoryController::class, 'update']);
Route::middleware('jwt.auth')->delete('/delete/{id}', [CategoryController::class, 'destroy']);
Route::middleware('jwt.auth')->get('/search/{value}', [CategoryController::class, 'search']);
