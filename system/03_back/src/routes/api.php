<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\BrandsController;
use App\Http\Controllers\UserAuthController;

use App\Http\Controllers\Api\MaintenanceItemsController;
use App\Http\Controllers\Api\SerifuUseController;


use App\Http\Controllers\Api\MasterDataController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\CustomersController;

use App\Http\Controllers\Api\TemporaryListController;
use App\Http\Controllers\Api\HelloController;
use App\Http\Controllers\Auth\SpAuthenticatedController;

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

// mobile
Route::post('/sp-login', [SpAuthenticatedController::class, 'login']);
Route::post('/sp-logout', [SpAuthenticatedController::class, 'logout']);

// web
Route::get('/hello', [HelloController::class, 'getGenres']);

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/serifu/genres', [SerifuUseController::class, 'getGenres']);
    Route::get('/serifu/titles', [SerifuUseController::class, 'getTitles']);
    Route::get('/serifu/serifus', [SerifuUseController::class, 'getSerifus']);
});

//Route::get('/serifu/genres', [SerifuUseController::class, 'getGenres'])->middleware('auth:sanctum');

Route::get('/user', [UserAuthController::class, 'getUser'])->middleware('auth:sanctum');



Route::get('someone', function (Request $request) {
    return $request->user();
});

// Route for login
// Route::post('login', [UserAuthController::class, 'login']);

// Route for remember me login
// Route::post('remember-me-login', [UserAuthController::class, 'rememberMeLogin']);

// Route for logout
//Route::post('logout', [UserAuthController::class, 'logout'])->middleware('auth:sanctum');
// Route::post('logout', [UserAuthController::class, 'logout'])->middleware('auth');
//Route::get('get-user', [UserAuthController::class, 'getUser'])->middleware('auth:sanctum');
Route::get('/get-user', [UserAuthController::class, 'getUser'])->middleware('auth:sanctum');


// master data
Route::get('/masterdata', [MasterDataController::class, 'getAllData']);
Route::get('/maintenance-items', [MaintenanceItemsController::class, 'index']);
Route::post('/maintenance-items/upsert', [MaintenanceItemsController::class, 'upsert']);

Route::get('/masterdata/branches', [MasterDataController::class, 'getBranches']);
Route::get('/masterdata/shitens', [MasterDataController::class, 'getMShitens']);
Route::post('/masterdata/shiten/upsert', [MasterDataController::class, 'upsertMShiten']);
Route::post('/masterdata/shiten/delete', [MasterDataController::class, 'deleteMShiten']);

Route::get('/masterdata/accounts', [MasterDataController::class, 'getMAccounts']);
Route::post('/masterdata/account/upsert', [MasterDataController::class, 'upsertMAccount']);
Route::post('/masterdata/account/delete', [MasterDataController::class, 'deleteMAccount']);


// customers
Route::get('/customers', [CustomersController::class, 'getCustomers']);
Route::get('/customers/search', [CustomersController::class, 'search']);

Route::get('/customer/{mu_usercode}', [CustomerController::class, 'getCustomer']);
Route::get('/customer-with-maintenance', [CustomerController::class, 'getCustomerWithMaintenance']);
Route::get('/customer-with-maintenances', [CustomerController::class, 'getCustomerWithMaintenances']);
Route::post('/customer/upsert', [CustomerController::class, 'upsert']);


Route::get('/temporary/list', [TemporaryListController::class, 'getTemporaryList']);
Route::post('/temporary/list-update', [TemporaryListController::class, 'updateTemporaryList']);

