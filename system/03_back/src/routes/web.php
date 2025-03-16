<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;
use App\Http\Controllers\UserAuthController;

use Illuminate\Foundation\Auth\EmailVerificationRequest;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return view('welcome');
});

// Route::middleware('guest')->group(function () {
//     Route::post('/login', [UserAuthController::class,"login"])->name('login');
//     Route::post('/remember-me-login', [UserAuthController::class,"rememberMeLogin"])->name('rememberMeLogin');
// });
// Route::post('/logout', [UserAuthController::class,"logout"])->middleware('auth:sanctum')->name('logout');

// Route::post('/login', [LoginController::class, 'login'])
//     ->middleware('guest')
//     ->name('login');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// sunctum
require __DIR__.'/auth.php';

// email verification
// Route::get('/email/verify', function () {
//     return view('auth.verify-email');
// })->middleware('auth:sanctum')->name('verification.notice');

// Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
//     ->middleware(['auth:sanctum','signed', 'throttle:6,1'])
//     ->name('verification.verify');
