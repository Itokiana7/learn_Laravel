<?php

use App\Http\Controllers\Api\CommentController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Employee;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\AuthController;

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
Route::post('/employee/addEmployee', [EmployeeController::class, 'addEmployee']);
Route::delete('/employee/deleteEmployee/{id}', [EmployeeController::class, 'deleteEmployee']);
Route::patch('/employee/updateEmployee/{id}', [EmployeeController::class, 'updateEmployee']);
Route::get('/employee/getOneEmployee/{id}', [EmployeeController::class, 'getOneEmployee']);

Route::post('/register', [AuthController::class, 'Register']);
Route::post('/login', [AuthController::class, 'Login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'Logout']);

