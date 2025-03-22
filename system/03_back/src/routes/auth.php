<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::middleware('guest')->group(function () {
    // Route::get('register', [RegisteredUserController::class, 'store'])
    //             ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    // Route::get('login', [AuthenticatedSessionController::class, 'store'])
    //             ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
                ->name('login');

    // 【不要？？】フロント側で画面を作成するため
    // Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
    //             ->name('password.request');

    // パスワードリセットリンクを送信する
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    // 【不要？？】フロント側で画面を作成するため
    // tokenを発行してリセット画面を表示する
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');

    // パスワードリセットを実行する
    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');

});


Route::middleware('auth:sanctum')->group(function () {
//Route::middleware('auth')->group(function () {

    // ？？？　https://readouble.com/laravel/8.x/ja/verification.html
    // 【不要】Eメール検証用メールの送信：フロント側で画面を作成するため不要
    // Route::get('verify-email', EmailVerificationPromptController::class)
    //             ->name('verification.notice');

    // Eメール検証：フロント側からAPI経由で呼び出す
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    // Eメール検証用メールの再送信：フロント側からAPI経由で呼び出す
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    // ？？？
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

    // ？？？
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    // ？？？
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});
