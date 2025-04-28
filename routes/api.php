<?php

use App\Http\Controllers\Api\CommentController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Employee;
use App\Http\Controllers\Api\EmployeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function(){
    return ['message' => 'Bienvenue Itokiana'];
});

// Route::get('/post/index', [PostController::class, 'index']);
// Route::post('/post/store', [PostController::class, 'store']);

Route::get('/employee/getAll', [EmployeeController::class, 'getEmployee']);