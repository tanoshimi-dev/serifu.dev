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


class CustomerController extends Controller
{

    public function getCustomer(string $mu_usercode)
    {
        //$mu_usercode = $request->mu_usercode;

        $customer = null;
        if ( !empty($mu_usercode) ) {
            $customer = DB::table('m_userinfo')->where('mu_usercode', $mu_usercode)->first();
        }
        // $brand->d_password = empty($brand->password) ? 
        //     '' : Crypt::decryptString($brand->password);
        //     // $brand->d_password = empty($brand->password) ? 
        //     // '' : Crypt::decryptString('test');
        
        //dd($list->first()->status->status_name);
        // データ取得
        // $users = User::get();
        return new JsonResponse([
            'mu_usercode'     => $mu_usercode,
            'customer'        => $customer,
            'serverError'     => false,
            'serverErrorData' => [],
        ]);
    }


    public function getCustomerWithMaintenance(Request $request)
    {
        $mu_usercode = $request->mu_usercode;
        $tm_recnum = $request->tm_recnum;

        $customer = null;
        $maintenance = null;

        if ( !empty($mu_usercode) ) {
            $customer = DB::table('m_userinfo')->where('mu_usercode', $mu_usercode)->first();

            if ( !empty($tm_recnum) ) {
                $maintenance = DB::table('t_menteinfo')->where('tm_recnum', $tm_recnum)->where('tm_usercode', $mu_usercode)->first();
            } else {
                $maintenance = DB::table('t_menteinfo')->where('tm_usercode', $mu_usercode)->orderBy('tm_recnum', 'desc')->first();
            }
        }
        
        return new JsonResponse([
            'mu_usercode'     => $mu_usercode,
            'customer'        => $customer,
            'tm_recnum'       => $tm_recnum,
            'maintenance'     => $maintenance,
            'serverError'     => false,
            'serverErrorData' => [],
            'request'         => $request->all(),
        ]);
    }

    public function upsert(UpsertCustomerRequest $request): JsonResponse
    {
        
        $customer_new_flag    = $request->input('customer_new_flag');
        $mu_usercode          = $request->input('mu_usercode') ?? null;
        $mu_mnumber           = $request->input('mu_mnumber');
        $mu_username          = $request->input('mu_username');
        $mu_usernamek         = $request->input('mu_usernamek');
        $mu_userperseon       = $request->input('mu_userperseon');
        
        $mu_kisyucode         = $request->input('mu_kisyucode');
        $mu_shitencode        = $request->input('mu_shitencode');
        $mu_deliveryperson    = $request->input('mu_deliveryperson');
        
        $mu_dealername        = $request->input('mu_dealername');
        $mu_dealerperson      = $request->input('mu_dealerperson');
        $mu_hosyucode         = $request->input('mu_hosyucode');

        $mu_deliveryyear      = $request->input('mu_deliveryyear');
        $mu_deliverymonth     = $request->input('mu_deliverymonth');
        $mu_deliveryday       = $request->input('mu_deliveryday');
        $mu_nextyear          = $request->input('mu_nextyear');
        $mu_nextmonth         = $request->input('mu_nextmonth');
        $mu_nextday           = $request->input('mu_nextday');

        $mu_tel               = $request->input('mu_tel');
        $mu_zipcode           = $request->input('mu_zipcode');
        $mu_addrepref         = $request->input('mu_addrepref');
        $mu_addrecity         = $request->input('mu_addrecity');

        
        $maintenance_new_flag = $request->input('maintenance_new_flag');
        $tm_recnum            = $request->input('tm_recnum') ?? null;
        $tm_repaircont        = $request->input('tm_repaircont');
        $tm_regularcheck      = $request->input('tm_regularcheck');
        $tm_userctmment       = $request->input('tm_userctmment');
        $tm_pdffilecheck      = $request->input('tm_pdffilecheck');

        $tm_itemcode          = $request->input('tm_itemcode');
        $tm_acceptname        = $request->input('tm_acceptname');
        
        $tm_acceptyear        = $request->input('tm_acceptyear');
        $tm_acceptmonth       = $request->input('tm_acceptmonth');
        $tm_acceptday         = $request->input('tm_acceptday');
        $tm_ctmplateyear      = $request->input('tm_ctmplateyear');
        $tm_ctmplatemonth     = $request->input('tm_ctmplatemonth');
        $tm_ctmplateday       = $request->input('tm_ctmplateday');
        $tm_errorcode         = $request->input('tm_errorcode');
        $tm_repaircont        = $request->input('tm_repaircont');
        $tm_workyear          = $request->input('tm_workyear');
        $tm_workmonth         = $request->input('tm_workmonth');
        $tm_workday           = $request->input('tm_workday');
        $tm_workperson        = $request->input('tm_workperson');
        $tm_exchangeparts     = $request->input('tm_exchangeparts');
        $tm_prover            = $request->input('tm_prover');
        $tm_workmemo          = $request->input('tm_workmemo');
        $tm_userctmment       = $request->input('tm_userctmment');




        // $errors = [];
        // $errors[] = '1エラーが発生しました。';
        // $errors[] = '2エラーが発生しました。';
        // $errors[] = '3エラーが発生しました。';
        

        // return new JsonResponse([
        //     'mu_usercode' => $mu_usercode,
        //     'mu_mnumber' => $mu_mnumber,
        //     'mu_username' => $mu_username,
        //     'mu_usernamek' => $mu_usernamek,
        //     'mu_userperseon' => $mu_userperseon,
        //     'customer_new_flag' => $customer_new_flag,
        //     'maintenance_new_flag' => $maintenance_new_flag,
        //     'tm_recnum' => $tm_recnum,
        //     'tm_repaircont' => $tm_repaircont,
        //     'serverError' => true,
        //     'serverErrorData' => $errors,
        //     'request' => $request->all(),
        // ]);

        // if ($request->has('contract_start_date')) {
        //     $contract_start_date = Carbon::parse($request->input('contract_start_date'));
        // }

        // if ($request->has('contract_end_date')) {
        //     $contract_end_date = Carbon::parse($request->input('contract_end_date'));
        // }

        $validator = $request->getValidator();


        // Check if validation fails
        $isValid = true;
        if ($validator->fails()) {
            $isValid = false;
        }

        if (!$isValid) {

            // データ復元用のデータを取得
            
            // validationエラーを配列に変換
            $errors = [];
            if (!empty($validator->errors())) {

                foreach ($validator->errors()->all() as $error) {
                    // Handle each error message
                    $errors[] = $error;
                }
            }

            // データ取得
            $customer    = DB::table('m_userinfo')->where('mu_usercode', $mu_usercode)->first(); 
            $maintenance = DB::table('t_menteinfo')->where('tm_usercode', $mu_usercode)->where('tm_recnum', $tm_recnum)->first(); 

            return new JsonResponse([
                // 'id' => $id,
                // 'data' => $brand,
                'customer'     => $customer,
                'maintenance'  => $maintenance,
                'serverError' => true,
                'errors' => $validator->errors(),
                // 'updateErrorData' => [ "aa" ],
                // 'updateErrorData' => $validator->errors()->toArray(),
                'serverErrorData' => $errors,
            ]);
        }

        $upsertCustomerInfoRecord = [
            'mu_mnumber'        => $mu_mnumber,
            'mu_username'       => $mu_username,
            'mu_usernamek'      => $mu_usernamek,
            'mu_userperseon'    => $mu_userperseon,
            'mu_kisyucode'      => $mu_kisyucode,
            'mu_shitencode'     => $mu_shitencode,
            'mu_deliveryperson' => $mu_deliveryperson,
            'mu_dealerperson'   => $mu_dealerperson,
            'mu_dealername'     => $mu_dealername,
            'mu_hosyucode'      => $mu_hosyucode,

            'mu_deliveryyear'   => $mu_deliveryyear,
            'mu_deliverymonth'  => $mu_deliverymonth,
            'mu_deliveryday'    => $mu_deliveryday,
            'mu_nextyear'       => $mu_nextyear,
            'mu_nextmonth'      => $mu_nextmonth,
            'mu_nextday'        => $mu_nextday,


            'mu_tel'            => $mu_tel,
            'mu_zipcode'        => $mu_zipcode,
            'mu_addrepref'      => $mu_addrepref,
            'mu_addrecity'      => $mu_addrecity,
    

        ];

        if($customer_new_flag == '1') {
            $upsertCustomerInfoRecord['created_at'] =  new Carbon('now');
            $mu_usercode = DB::table('m_userinfo')->insertGetId($upsertCustomerInfoRecord);

        } else {
            DB::table('m_userinfo')->where('mu_usercode', $mu_usercode)->update($upsertCustomerInfoRecord);
        }

        $upsertMaintenanceInfoRecord = [
            'tm_usercode'     => $mu_usercode,

            'tm_itemcode' => $tm_itemcode,
            'tm_acceptname' => $tm_acceptname,
            'tm_acceptyear' => $tm_acceptyear,
            'tm_acceptmonth' => $tm_acceptmonth,
            'tm_acceptday' => $tm_acceptday,
            'tm_ctmplateyear' => $tm_ctmplateyear,
            'tm_ctmplatemonth' => $tm_ctmplatemonth,
            'tm_ctmplateday' => $tm_ctmplateday,
            'tm_errorcode' => $tm_errorcode,
            'tm_repaircont'   => $tm_repaircont,
            'tm_workyear' => $tm_workyear,
            'tm_workmonth' => $tm_workmonth,
            'tm_workday' => $tm_workday,
            'tm_workperson' => $tm_workperson,
            'tm_exchangeparts' => $tm_exchangeparts,
            'tm_prover' => $tm_prover,
            'tm_regularcheck' => $tm_regularcheck,
            'tm_workmemo' => $tm_workmemo,
            'tm_userctmment' => $tm_userctmment,

            'tm_pdffilecheck' => $tm_pdffilecheck,

        ];


        
        if($maintenance_new_flag == '1') {
            $upsertMaintenanceInfoRecord['created_at'] =  new Carbon('now');
            $tm_recnum = DB::table('t_menteinfo')->insertGetId($upsertMaintenanceInfoRecord);
            
        } else {
            DB::table('t_menteinfo')->where('tm_recnum', $tm_recnum)->update($upsertMaintenanceInfoRecord);
        }

        // PDFファイルの保存、ファイル名をDBに保存
        $pdffname             = "{$mu_usercode}-{$tm_recnum}.pdf";
        if ($request->input_pdf_file) {
            $file = $request->input_pdf_file;
            Storage::delete("public/{$mu_usercode}", $pdffname);
            $file->storeAs("public/{$mu_usercode}", $pdffname);

            DB::table('t_menteinfo')->where('tm_recnum', $tm_recnum)->update(
                ['tm_pdffname_local' => $pdffname]
            );
        }

        // データ取得
        $customer    = DB::table('m_userinfo')->where('mu_usercode', $mu_usercode)->first(); 
        $maintenance = DB::table('t_menteinfo')->where('tm_usercode', $mu_usercode)->where('tm_recnum', $tm_recnum)->first(); 

        return new JsonResponse([
            'mu_usercode'  => $mu_usercode,
            'customer'     => $customer,
            'tm_recnum'    => $tm_recnum,
            'maintenance'  => $maintenance,
            'serverError'  => false,
        ]);
    }



    public function getCustomerWithMaintenances(Request $request)
    {
        $mu_usercode = $request->mu_usercode;
        $customer_search_type = $request->customer_search_type;

        $customer = DB::table('m_userinfo')->where('mu_usercode', $mu_usercode)->first();
        $maintenances = null;

        if ($customer_search_type == '1') {
            $maintenances = DB::table('t_menteinfo')->where('tm_usercode', $mu_usercode)->orderBy('tm_recnum', 'desc')->get();
        } else {
            $maintenances = DB::table('o_menteinfo')->where('om_usercode', $mu_usercode)->orderBy('om_recnum', 'desc')->get();
        }
        
        return new JsonResponse([
            'customer_search_type' => $customer_search_type,
            'mu_usercode'     => $mu_usercode,
            'customer'        => $customer,
            'maintenances'    => $maintenances,
            'serverError'     => false,
            'serverErrorData' => [],
            'request'         => $request->all(),
        ]);
    }

}
