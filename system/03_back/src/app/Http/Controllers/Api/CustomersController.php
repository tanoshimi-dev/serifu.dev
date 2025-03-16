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

use App\Http\Requests\UpsertCustomerRequest;


class CustomersController extends Controller
{

    public function getCustomers(Request $request)
    {
        $toFlag      = $request->input('t_o_flag');
        $muMnumber   = $request->input('mu_mnumber');
        $muModelnum  = $request->input('mu_modelnum');
        $muUsername  = $request->input('mu_username');
        $muTel       = $request->input('mu_tel');

        $query = DB::table('m_userinfo');
        if (!empty($toFlag)) {
            $query = $query->where('t_o_flag', $toFlag);
        }
        if (!empty($muMnumber)) {
            $query = $query->where('mu_mnumber', 'like', "%{$muMnumber}%"); 
        }
        if (!empty($muModelnum)) {
            $query = $query->where('mu_modelnum', 'like', "%{$muModelnum}%"); 
        }
        if (!empty($muUsername)) {
            $query = $query->where('mu_username', 'like', "%{$muUsername}%"); 
        }
        if (!empty($muTel)) {
            $query = $query->where('mu_tel', 'like', "%{$muTel}%"); 
        }

        $customers = $query->get();
        return new JsonResponse([
            'customers'       => $customers,
            'reLoginRequired' => false,
            'serverError'     => false,
            'serverErrorData' => [],
        ]);

    }

    public function search(Request $request)
    {
        $query = DB::table('m_userinfo'); 
        $customers = $query->get();
        return new JsonResponse([
            'customers'       => $customers,
            'reLoginRequired' => false,
            'serverError'     => false,
            'serverErrorData' => [],
        ]);

    }

}
