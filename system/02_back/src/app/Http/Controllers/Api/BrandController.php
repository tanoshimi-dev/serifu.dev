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

use App\Http\Requests\UpsertBrandRequest;


class BrandController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function select(Request $request)
    {
        $id = $request->id;

        $brand = null;
        if ( !empty($id) ) {
            $brand = DB::table('brands')->where('id', $id)->first();
        }
        // $brand->d_password = empty($brand->password) ? 
        //     '' : Crypt::decryptString($brand->password);
        //     // $brand->d_password = empty($brand->password) ? 
        //     // '' : Crypt::decryptString('test');
        
        //dd($list->first()->status->status_name);
        // データ取得
        // $users = User::get();
        return new JsonResponse([
            'data' => $brand,
            'id' => $id,
            'request' => $request->all(),
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function upsert(UpsertBrandRequest $request): JsonResponse
    {

        $id = $request->input('id');
        $bid = $request->input('bid');
        $name = $request->input('name');
        $contact_person = $request->input('contact_person');
        $account = $request->input('account');
        $new_password = $request->input('new_password');
        $hashedPassword = !empty($new_password) ? Hash::make($new_password) : null;
        // $hashedPassword = !empty($new_password) ? ($new_password) : null;
        $contract_start_date = null;
        $contract_end_date = null;
        $memo = $request->input('memo');

        if ($request->has('contract_start_date')) {
            $contract_start_date = Carbon::parse($request->input('contract_start_date'));
        }

        if ($request->has('contract_end_date')) {
            $contract_end_date = Carbon::parse($request->input('contract_end_date'));
        }

        // return new JsonResponse([
        //     'id' => $id,
        //     'name' => $name,
        //     'product_code' => $product_code,
        //     'item_code' => $item_code,
        // ]);
        // Manually run validation
        $validator = Validator::make($request->all(), $request->rules());

        // Check if validation fails
        $isValid = true;
        if ($validator->fails()) {
            $isValid = false;
            //dd($validator->errors());
            // データ取得
            // throw new ValidationException($validator);
        }

        // 入力されたBID、アカウントが既に登録されていればエラー
        if (empty($id)) {
            // 新規登録時
            if (!empty($bid) && DB::table('brands')->where('bid', $bid)->exists()) {
                $isValid = false;
                $validator->errors()->add('bid', '既に登録されているBIDです。');
            }
            if (!empty($account) && DB::table('brands')->where('account', $account)->exists()) {
                $isValid = false;
                $validator->errors()->add('account', '既に登録されているアカウントです。');
            }
            // 初回登録時はパスワード必須
            if(empty($new_password)) {
                $isValid = false;
                $validator->errors()->add('new_password', 'パスワードは必須です。');
            }

        } else {
            $resisteredRecord = DB::table('brands')->where('id', $id)->first();

            if ( !empty($bid) && 
                ($resisteredRecord->bid !== $bid)) { // $bidが変更されている場合

                if(DB::table('brands')->where('bid', $bid)->exists()) {
                    $isValid = false;
                    $validator->errors()->add('bid', '既に登録されているBIDです。');
                }

                if(DB::table('orders')->where('bid', $resisteredRecord)->exists()) {
                    $isValid = false;
                    $validator->errors()->add('bid', '該当ブランドIDは既に注文が登録されているため変更できません。');
                }
            }
            if ( !empty($account) && 
                ($resisteredRecord->account !== $account) 
                && DB::table('brands')->where('account', $account)->exists()) {
                $isValid = false;
                $validator->errors()->add('account', '既に登録されているアカウントです。');
            }

        }

        if (!$isValid) {

            // データ復元用のデータを取得
            $brand = DB::table('brands')->where('id', $id)->first(); 
            if (empty($brand)) {
                $brand = [
                    'id' => $id,
                    'bid' => $bid,
                    'name' => $name,
                    'contact_person' => $contact_person,
                    'account' => $account,
                    'contract_start_date' => $contract_start_date,
                    'contract_end_date' => $contract_end_date,
                    'memo' => $memo,
                ];
            }        
            
            // validationエラーを配列に変換
            $errors = [];
            if (!empty($validator->errors())) {

                foreach ($validator->errors()->all() as $error) {
                    // Handle each error message
                    $errors[] = $error;
                }
            }

            return new JsonResponse([
                'id' => $id,
                'data' => $brand,
                'updateError' => true,
                'errors' => $validator->errors(),
                // 'updateErrorData' => [ "aa" ],
                // 'updateErrorData' => $validator->errors()->toArray(),
                'updateErrorData' => $errors,
            ]);
        }

        $upsertRecord = [
            'bid' => $bid,
            'name' => $name,
            'contact_person' => $contact_person,
            'account' => $account,
            'contract_start_date' => $contract_start_date,
            'contract_end_date' => $contract_end_date,
            'memo' => $memo,
        ];

        // パスワードが入力されていれば更新（初回登録時は必ず入力されている）
        if (!empty($new_password)) {
            $upsertRecord['password'] = $hashedPassword;
        }

        if(empty($id)){
            $upsertRecord['created_at'] =  new Carbon('now');
            $id = DB::table('brands')->insertGetId($upsertRecord);

        } else {
            DB::table('brands')->where('id', $id)->update($upsertRecord);
        }


        // データ取得
        $brand = DB::table('brands')->where('id', $id)->first(); 

        return new JsonResponse([
            'upsertRecord' => $upsertRecord,
            'id' => $id,
            'data' => $brand,
            'updateError' => false,
        ]);
    }

}
