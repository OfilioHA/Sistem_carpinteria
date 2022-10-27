<?php

use App\Http\Controllers\FurnitureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WoodController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GeneralCatalogController;
use App\Http\Controllers\WorkerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [ LoginController::class, 'login' ]);
Route::post('/register', [ LoginController::class, 'register' ]);
Route::post('/user', [ LoginController::class, 'user' ]);

Route::apiResources([
    'woods' => WoodController::class,
    'suppliers' => SupplierController::class,
    'workers' => WorkerController::class,
    'users' => UserController::class,
    'furnitures' => FurnitureController::class
]);

Route::prefix('catalog')->group(function () {
    Route::get('/jobs', [GeneralCatalogController::class, 'jobs']);
    Route::get('/woods', [WoodController::class, 'catalog']);
    Route::get('/genders', [GeneralCatalogController::class, 'genders']);
    Route::get('/states', [GeneralCatalogController::class, 'states']);
    Route::get('/states/{id}/cities', [GeneralCatalogController::class, 'cities']);
    Route::get('/woods/species', [WoodController::class, 'species']);
    Route::get('/woods/typecuts', [WoodController::class, 'typeCuts']);
    Route::get('/woods/measures', [WoodController::class, 'measures']);
    Route::get('/users/roles', [UserController::class, 'roles']);
});
