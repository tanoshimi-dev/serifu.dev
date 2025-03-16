<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\AuthManager;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;


final class UserAuthController extends Controller
{
    private $auth;

    /**
     * @param AuthManager $auth
     */
    public function __construct(AuthManager $auth) 
    {
        $this->auth = $auth;
    }

    public function getAuthUser(Request $request): JsonResponse
    {
        $user = $request->user();
        //dd($this->auth, $request->user(), $request);

        return new JsonResponse([
            'data' => $user,
            'user' => $user,
            'request' => $request,
            'auth' => $this->auth,
            'session' => $request->session()->all(),
        ]);
    }
        


    // public function login(LoginRequest $request): JsonResponse
    public function login(Request $request): JsonResponse
    {

        $credentials = $request->only(['userid', 'password']);

        // remember_token on
        // if (Auth::attempt($credentials, true)) {
        if (Auth::attempt($credentials)) {
    
            //$request->authenticate();
            
            $request->session()->regenerate();
            $request->session()->regenerateToken();
            $user = $request->user();

            // $data = DB::table('admin_users')
            //     ->where('admin_users.id', $user->id)
            //     ->first();
            $data = DB::table('m_account')
                ->where('m_account.userid', $user->userid)
                ->first();

            $user = Auth::user();
            $access_token = $user->createToken('auth_token')->plainTextToken;
        
        //dd($token, $user, $data);

            return new JsonResponse([
                'message'      => 'Authenticated.',
                'data'         => $data,
                'access_token' => $access_token,
                'token_type'   => 'Bearer',
            ]);
        }

        throw new AuthenticationException();
    }

    public function rememberMeLogin(Request $request): JsonResponse
    {

                                       
        // return new JsonResponse([
        //     'message' => 'テストAuthenticated.',
        //     'auth' => Auth::viaRemember(),
        //     'check' => Auth::check(),
        //     'data' => $request->user(),
        //     'data2' => Auth::user(),
        // ]);

        if (Auth::viaRemember()) {
    
            $data = $request->user();
                                       
            return new JsonResponse([
                'message' => 'Authenticated.',
                'data' => $data,
            ]);
        }

        throw new AuthenticationException();
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function logout(Request $request): JsonResponse
    public function logout(Request $request)
    {

        // if ($this->auth->guard()->guest()) {
        //     return new JsonResponse([
        //         'message' => 'Already Unauthenticated.',
        //     ]);
        // }

        // $this->auth->guard()->logout();
        // $request->session()->invalidate();
        // $request->session()->regenerateToken();
        // $request->user()->tokens()->delete();

        // return new JsonResponse([
        //     'message' => 'Unauthenticated.',
        // ]);
    
        $user = $request->user();

        if (!$user) {
            return new JsonResponse([
                'message' => 'Already Unauthenticated.',
            ]);
        }

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $user->tokens()->delete();

        return response()->noContent();

        // return new JsonResponse([
        //     'message' => 'Unauthenticated.',
        // ]);

    }

    public function getUser(Request $request): JsonResponse
    {
        $user = $request->user();
        //dd($this->auth, $request->user(), $request);

        return new JsonResponse([
            'data' => $user,
            'user' => $user,
            'request' => $request,
            'auth' => $this->auth,
            'session' => $request->session()->all(),
        ]);
    }


}
