<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException; 
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;


class SerifuUseController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getGenres(Request $request)
    {
        $genres = DB::table('genres')->get();
        return new JsonResponse([
            'genres' => $genres,
        ]);
    }

    public function getTitles(Request $request)
    {
        $titles = DB::table('titles')->get();
        return new JsonResponse([
            'titles' => $titles,
        ]);
    }

    public function getSerifus(Request $request)
    {
        $title_id = $request->input('title');
        if($title_id){
            $serifus = DB::table('serifus')->where('title_id', $title_id)->get();
        } else {
            $serifus = DB::table('serifus')->get();
        }

        return new JsonResponse([
            'serifus' => $serifus,
        ]);
    }

}
