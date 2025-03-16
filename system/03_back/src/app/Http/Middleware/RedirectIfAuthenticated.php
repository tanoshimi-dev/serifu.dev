<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string|null  ...$guards
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                
                // https://qiita.com/kensukeX/items/a045c5b4ecec033425d4
                if ($request->expectsJson()) {
                    // リクエストがJSONを期待している場合、認証済みであることを示すJSONレスポンスを返します。
                    $user = $request->user();
                    return response()->json([
                        'message' => 'You are already authenticated.',
                        'data' => $user,
                    ], 200);
                }
                //
                //return redirect(RouteServiceProvider::HOME);
            }
        }

        return $next($request);
    }
}
