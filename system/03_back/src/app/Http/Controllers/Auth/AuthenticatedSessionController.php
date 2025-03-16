<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
//use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Auth\AuthManager;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    // public function create(): Response
    // {
    //     return Inertia::render('Auth/Login', [
    //         'canResetPassword' => Route::has('password.request'),
    //         'status' => session('status'),
    //     ]);
    // }
    
    private $auth;

    /**
     * @param AuthManager $auth
     */
    public function __construct(AuthManager $auth) 
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming authentication request.
     */
    //public function store(LoginRequest $request): Response
    // public function store(LoginRequest $request): JsonResponse
    public function store(Request $request): JsonResponse
    {

        // 2回目は勝手にリダイレクトされるため
        // $request->authenticate();

        $credentials = $request->only(['email', 'password']);

        if (Auth::attempt($credentials)) {

            $request->session()->regenerate();

            // return response()->noContent();
            
            // $user = $request->user();
            $user = Auth::user();
            $access_token = $user->createToken('auth_token')->plainTextToken;
    
            // return new JsonResponse([
            //     '乱数' => rand(),
            //     date('Y-m-d H:i:s'), $user, $access_token]);
    
            return new JsonResponse([
                'message'      => 'Authenticated.',
                'data'         => $user,
                // 'access_token' => $access_token,
                // 'token_type'   => 'Bearer',
            ]);
    
            //return response()->json(['message' => 'Login successful'], 200);        
        }
        
        throw new AuthenticationException();

    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
