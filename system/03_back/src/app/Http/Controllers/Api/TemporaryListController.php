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
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Redirect;
// use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;


class TemporaryListController extends Controller
{


    public function getTemporaryList()
    {

        // $brand_id = $request->input('brand_id');
        // $ordered_at_from = $request->input('ordered_at_from');
        // $ordered_at_to = $request->input('ordered_at_to');
        // $order_status = $request->input('order_status');


        $temporary_list = DB::table('t_menteinfo as mente')
            ->join('m_userinfo as user', 'user.mu_usercode', '=', 'mente.tm_usercode')
            ->join('m_maintenanceitem as item', 'item.m_itemcode', '=', 'mente.tm_itemcode')
            ->join('m_hosyu as hosyu', 'hosyu.m_hosyucode', '=', 'user.mu_hosyucode')
            ->select(
                'mente.tm_recnum', 'mente.tm_usercode', 'mente.tm_itemcode', 'mente.tm_acceptyear', 'mente.tm_acceptmonth',
                'mente.tm_acceptday', 'mente.tm_acceptname', 'mente.tm_ctmplateyear', 'mente.tm_ctmplatemonth', 'mente.tm_ctmplateday',
                'mente.tm_errorcode', 'mente.tm_repaircont', 'mente.tm_workyear', 'mente.tm_workmonth', 'mente.tm_workday',
                'mente.tm_workperson', 'mente.tm_exchangeparts', 'mente.tm_oxygendensity', 'mente.tm_oxygenflow', 'mente.tm_psapress_u',
                'mente.tm_psapress_l', 'mente.tm_prover', 'mente.tm_regularcheck', 'mente.tm_workmemo', 'mente.tm_userctmment',
                'mente.tm_pdffilecheck', 'mente.tm_pdffname_local', 'mente.tm_pdffname_server', 'mente.tm_usercode',
                'user.mu_usercode', 'user.mu_mnumber', 'user.mu_username', 'user.mu_usernamek', 'user.mu_userperseon',
                'user.mu_tel', 'user.mu_zipcode', 'user.mu_addrepref', 'user.mu_addrecity', 'user.mu_modelnum',
                'user.mu_shitencode', 'user.mu_deliveryperson', 'user.mu_deliveryyear', 'user.mu_deliverymonth', 'user.mu_deliveryday',
                'user.mu_dealername', 'user.mu_dealerperson', 'user.mu_hosyucode', 'user.mu_nextyear', 'user.mu_nextmonth',
                'user.mu_nextday', 
                'mente.tm_itemcode', 'mente.tm_itemcode', 'mente.tm_itemcode', 'mente.tm_itemcode', 
                'item.m_itemname',
                'hosyu.m_hosyuname'
            )
            ->get();
        

        return new JsonResponse([
            'list' => $temporary_list,
        ]);
    

        // $m_branches      = DB::table('m_branch')->get();
        // $machine_models  = DB::table('m_machine_model')->get();
        // $maint_contracts = DB::table('m_maint_contract')->get();
        // $service_agents  = DB::table('m_service_agent')->get();

        // $masterData = [
        //     'branches'       => $m_branches,
        //     'machinModels'   => $machine_models,
        //     'maintContracts' => $maint_contracts,
        //     'serviceAgents'  => $service_agents,
        // ];

        // データ取得
        return new JsonResponse([
            // 'masterData' => $masterData,
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

    public function updateTemporaryList(Request $request)
    {

        $updateList   = $request->input('updateList');

        if(!empty($updateList)){
            $upsertRecord['updated_at'] =  new Carbon('now');
            DB::table('t_menteinfo')->whereIn('tm_recnum', $updateList)->update($upsertRecord);
        }

        foreach ($updateList as $recnum) {
            
            $t_menteinfo = DB::table('t_menteinfo')->where('tm_recnum', $recnum)->first();

            $temporary_list = DB::table('t_menteinfo as mente')
            ->join('m_userinfo as user', 'user.mu_usercode', '=', 'mente.tm_usercode')
            ->join('m_maintenanceitem as item', 'item.m_itemcode', '=', 'mente.tm_itemcode')
            ->join('m_hosyu as hosyu', 'hosyu.m_hosyucode', '=', 'user.mu_hosyucode')
            ->select(
                'mente.tm_recnum', 'mente.tm_usercode', 'mente.tm_itemcode', 'mente.tm_acceptyear', 'mente.tm_acceptmonth',
                'mente.tm_acceptday', 'mente.tm_acceptname', 'mente.tm_ctmplateyear', 'mente.tm_ctmplatemonth', 'mente.tm_ctmplateday',
                'mente.tm_errorcode', 'mente.tm_repaircont', 'mente.tm_workyear', 'mente.tm_workmonth', 'mente.tm_workday',
                'mente.tm_workperson', 'mente.tm_exchangeparts', 'mente.tm_oxygendensity', 'mente.tm_oxygenflow', 'mente.tm_psapress_u',
                'mente.tm_psapress_l', 'mente.tm_prover', 'mente.tm_regularcheck', 'mente.tm_workmemo', 'mente.tm_userctmment',
                'mente.tm_pdffilecheck', 'mente.tm_pdffname_local', 'mente.tm_pdffname_server', 'mente.tm_usercode',
                'user.mu_usercode', 'user.mu_mnumber', 'user.mu_username', 'user.mu_usernamek', 'user.mu_userperseon',
                'user.mu_tel', 'user.mu_zipcode', 'user.mu_addrepref', 'user.mu_addrecity', 'user.mu_modelnum',
                'user.mu_shitencode', 'user.mu_deliveryperson', 'user.mu_deliveryyear', 'user.mu_deliverymonth', 'user.mu_deliveryday',
                'user.mu_dealername', 'user.mu_dealerperson', 'user.mu_hosyucode', 'user.mu_nextyear', 'user.mu_nextmonth',
                'user.mu_nextday', 
                'mente.tm_itemcode', 'mente.tm_itemcode', 'mente.tm_itemcode', 'mente.tm_itemcode', 
                'item.m_itemname',
                'hosyu.m_hosyuname'
            )
            ->get();

            if (!empty($t_menteinfo)) {

                $now = new Carbon('now');
                $record = [
                    'om_usercode'         => $t_menteinfo->tm_usercode,
                    'om_itemcode'         => $t_menteinfo->tm_itemcode,
                    'om_acceptyear'       => $t_menteinfo->tm_acceptyear,
                    'om_acceptmonth'      => $t_menteinfo->tm_acceptmonth,
                    'om_acceptday'        => $t_menteinfo->tm_acceptday,
                    'om_acceptname'       => $t_menteinfo->tm_acceptname,
                    'om_ctmplateyear'     => $t_menteinfo->tm_ctmplateyear,
                    'om_ctmplatemonth'    => $t_menteinfo->tm_ctmplatemonth,
                    'om_ctmplateday'      => $t_menteinfo->tm_ctmplateday,
                    'om_errorcode'        => $t_menteinfo->tm_errorcode,
                    'om_repaircont'       => $t_menteinfo->tm_repaircont,
                    'om_workyear'         => $t_menteinfo->tm_workyear,
                    'om_workmonth'        => $t_menteinfo->tm_workmonth,
                    'om_workday'          => $t_menteinfo->tm_workday,
                    'om_workperson'       => $t_menteinfo->tm_workperson,
                    'om_exchangeparts'    => $t_menteinfo->tm_exchangeparts,
                    'om_oxygendensity'    => $t_menteinfo->tm_oxygendensity,
                    'om_oxygenflow'       => $t_menteinfo->tm_oxygenflow,
                    'om_psapress_u'       => $t_menteinfo->tm_psapress_u,
                    'om_psapress_l'       => $t_menteinfo->tm_psapress_l,
                    'om_prover'           => $t_menteinfo->tm_prover,
                    'om_regularcheck'     => $t_menteinfo->tm_regularcheck,
                    'om_workmemo'         => $t_menteinfo->tm_workmemo,
                    'om_userctmment'      => $t_menteinfo->tm_userctmment,
                    'om_pdffilecheck'     => $t_menteinfo->tm_pdffilecheck,
                    'om_pdffname_local'   => $t_menteinfo->tm_pdffname_local,
                    'om_pdffname_server'  => $t_menteinfo->tm_pdffname_server,
                    'created_at'          => $now,
                    'updated_at'          => $now,
                ];
    
                if (DB::table('o_menteinfo')->insert($record)) {
                    DB::table('t_menteinfo')->where('tm_recnum', $t_menteinfo->tm_recnum)->delete();
                }
    
            }

        }


        // データ取得
        $temporary_list = DB::table('t_menteinfo as mente')
            ->join('m_userinfo as user', 'user.mu_usercode', '=', 'mente.tm_usercode')
            ->join('m_maintenanceitem as item', 'item.m_itemcode', '=', 'mente.tm_itemcode')
            ->join('m_hosyu as hosyu', 'hosyu.m_hosyucode', '=', 'user.mu_hosyucode')
            ->select(
                'mente.tm_recnum', 'mente.tm_usercode', 'mente.tm_itemcode', 'mente.tm_acceptyear', 'mente.tm_acceptmonth',
                'mente.tm_acceptday', 'mente.tm_acceptname', 'mente.tm_ctmplateyear', 'mente.tm_ctmplatemonth', 'mente.tm_ctmplateday',
                'mente.tm_errorcode', 'mente.tm_repaircont', 'mente.tm_workyear', 'mente.tm_workmonth', 'mente.tm_workday',
                'mente.tm_workperson', 'mente.tm_exchangeparts', 'mente.tm_oxygendensity', 'mente.tm_oxygenflow', 'mente.tm_psapress_u',
                'mente.tm_psapress_l', 'mente.tm_prover', 'mente.tm_regularcheck', 'mente.tm_workmemo', 'mente.tm_userctmment',
                'mente.tm_pdffilecheck', 'mente.tm_pdffname_local', 'mente.tm_pdffname_server', 'mente.tm_usercode',
                'user.mu_usercode', 'user.mu_mnumber', 'user.mu_username', 'user.mu_usernamek', 'user.mu_userperseon',
                'user.mu_tel', 'user.mu_zipcode', 'user.mu_addrepref', 'user.mu_addrecity', 'user.mu_modelnum',
                'user.mu_shitencode', 'user.mu_deliveryperson', 'user.mu_deliveryyear', 'user.mu_deliverymonth', 'user.mu_deliveryday',
                'user.mu_dealername', 'user.mu_dealerperson', 'user.mu_hosyucode', 'user.mu_nextyear', 'user.mu_nextmonth',
                'user.mu_nextday', 
                'mente.tm_itemcode', 'mente.tm_itemcode', 'mente.tm_itemcode', 'mente.tm_itemcode', 
                'item.m_itemname',
                'hosyu.m_hosyuname'
            )
            ->get();
        
        return new JsonResponse([
            'gettype' => gettype($updateList),
            'list'         => $temporary_list,
            'serverError'  => false,
        ]);
    }

}
