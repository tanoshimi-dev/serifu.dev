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
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use Carbon\Carbon;


class MasterDataController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllData()
    {
        $m_kisyus           = DB::table('m_kisyu')->get();
        $m_shitens          = DB::table('m_shiten')->get();
        $m_services         = DB::table('m_service')->get();
        $m_hosyus           = DB::table('m_hosyu')->get();
        $maintenance_items  = DB::table('m_maintenanceitem')->get();
        $m_errors           = DB::table('m_error')->get();

        $m_branches         = DB::table('m_branch')->get();
        $machine_models     = DB::table('m_machine_model')->get();
        $maint_contracts    = DB::table('m_maint_contract')->get();
        $service_agents     = DB::table('m_service_agent')->get();

        $m_exchangeparts    = DB::table('m_exchangepart')->get();

        $masterData = [
            'mKisyus'            => $m_kisyus,
            'mShitens'           => $m_shitens,
            'mServices'          => $m_services,
            'mHosyus'            => $m_hosyus,
            'mMaintenanceItems'  => $maintenance_items,
            'mErrors'            => $m_errors,

            'branches'       => $m_branches,
            'machinModels'   => $machine_models,
            'maintContracts' => $maint_contracts,
            'serviceAgents'  => $service_agents,

            'mExchangeparts'     => $m_exchangeparts,
        ];

        // データ取得
        return new JsonResponse([
            'masterData' => $masterData,
        ]);
    }

    public function getBranches()
    {
        $m_branches = DB::table('m_branch')->get();

        // データ取得
        return new JsonResponse([
            'branches' => $m_branches,
        ]);
    }

    public function getMShitens()
    {
        $m_shitens = DB::table('m_shiten')->get();
        // foreach ($m_shitens as $m_shiten) {
        //     $m_shiten->id = ($m_shiten->id) . '-' . ($m_shiten->m_shitencode);
        // }
        // データ取得
        return new JsonResponse([
            'mShitens' => $m_shitens,
        ]);
    }

    public function upsertMShiten(Request $request)
    {

        $id           = $request->input('id');
        $m_shitencode = $request->input('m_shitencode');
        $m_shitenname = $request->input('m_shitenname');

        $upsertRecord = [
            'id'           => $id,
            'm_shitencode' => $m_shitencode,
            'm_shitenname' => $m_shitenname,
        ];

        if(empty($id)){
            $upsertRecord['created_at'] =  new Carbon('now');
            $id = DB::table('m_shiten')->insertGetId($upsertRecord);

        } else {
            DB::table('m_shiten')->where('id', $id)->update($upsertRecord);
        }

        // データ取得
        $m_shitens = DB::table('m_shiten')->get();
        return new JsonResponse([
            'upsertRecord' => $upsertRecord,
            'mShitens'     => $m_shitens,
            'serverError'  => false,
        ]);
    }

    public function deleteMShiten(Request $request)
    {

        $id = $request->input('id');

        if(!empty($id)){
            DB::table('m_shiten')->where('id', $id)->delete();
        }

        // データ取得
        $m_shitens = DB::table('m_shiten')->get();
        return new JsonResponse([
            'id'           => $id,
            'mShitens'     => $m_shitens,
            'serverError'  => false,
        ]);
    }


    public function getMAccounts()
    {
        $m_accounts = DB::table('m_account')->where('authority', "<>", "1")->get();
        // データ取得
        return new JsonResponse([
            'mAccounts' => $m_accounts,
        ]);
    }

    public function upsertMAccount(Request $request)
    {

        $id       = $request->input('id');
        $userid   = $request->input('userid');
        $new_password = $request->input('new_password');

        $upsertRecord = [
            'userid'    => $userid,
            'authority' => '0',
        ];
        
        if (!empty($new_password)) {
            $upsertRecord['password'] = Hash::make($new_password);
        }
        
        if(empty($id)){
            $upsertRecord['created_at'] =  new Carbon('now');
            $id = DB::table('m_account')->insertGetId($upsertRecord);

        } else {
            DB::table('m_account')->where('id', $id)->update($upsertRecord);
        }

        // データ取得
        $m_accounts = DB::table('m_account')->where('authority', "<>", "1")->get();
        return new JsonResponse([
            'upsertRecord' => $upsertRecord,
            'mAccounts'     => $m_accounts,
            'serverError'  => false,
        ]);
    }

    public function deleteMAccount(Request $request)
    {

        $id = $request->input('id');

        if(!empty($id)){
            DB::table('m_account')->where('id', $id)->where("authority", "<>", "1")->delete();
        }

        // データ取得
        $m_account = DB::table('m_account')->where("authority", "<>", "1")->get();
        return new JsonResponse([
            'id'           => $id,
            'mAccounts'    => $m_account,
            'serverError'  => false,
        ]);
    }


}
