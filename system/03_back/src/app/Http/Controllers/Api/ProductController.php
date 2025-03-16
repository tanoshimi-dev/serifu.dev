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
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException; 
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

use App\Http\Requests\UpsertProductRequest;

class ProductController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function selectProduct(Request $request)
    {
        $id = $request->id;

        $product = null;
        if ( !empty($id) ) {
            $product = DB::table('products')->where('id', $id)->first();
        }
        //dd($list->first()->status->status_name);
        // データ取得
        // $users = User::get();
        return new JsonResponse([
            'data' => $product,
            'id' => $id,
            'request' => $request->all(),
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function upsert(UpsertProductRequest $request): JsonResponse
    {

        $id = $request->input('id');
        $pid = $request->input('pid');
        $bid = $request->input('bid');
        $url = $request->input('url');
        $name_kr = $request->input('name_kr');
        $name_en = $request->input('name_en');
        $product_code = $request->input('product_code');
        $item_code = $request->input('item_code');
        $item_status = $request->input('item_status');
        $color = $request->input('color');
        $size = $request->input('size');
        $size_detail = $request->input('size_detail');
        $material = $request->input('material');
        $purchase_price = $request->input('purchase_price');
        $sales_price = $request->input('sales_price');
        $discount_rate = $request->input('discount_rate');
        $stock = $request->input('stock');
        $note = $request->input('note');

        $dummy_path = '';//$request->input('dummy_path');
        if ($request->product_file) {
            $file = $request->product_file;
            // $file->storeAs("public/products", $file->getClientOriginalName());
            // $upsertRecord['image_path'] = $file->getClientOriginalName();
            $dummy_path = $file->getClientOriginalName();
        }

        $validator = Validator::make($request->all(), $request->rules());

        // Check if validation fails
        $isValid = true;
        if ($validator->fails()) {
            $isValid = false;
        }

        // 入力されたBID、アカウントが既に登録されていればエラー
        if (!empty($id)) {
            $resisteredRecord = DB::table('products')->where('id', $id)->first();

            if ( !empty($product_code) && !empty($item_code) && 
                ($resisteredRecord->product_code !== $product_code || $resisteredRecord->item_code !== $item_code) && // 変更されている場合
                (DB::table('products')
                    ->where('product_code', $product_code)->where('item_code', $item_code)
                    ->exists()) ){
                $isValid = false;
                $validator->errors()->add('data', '既に登録されている商品です。');
            }

        }

        // return new JsonResponse([
        //     'id' => $id,
        //     'name' => $name,
        //     'product_code' => $product_code,
        //     'item_code' => $item_code,
        // ]);

        if (!$isValid) {

            // データ復元用のデータを取得
            $product = [
                'pid' => $pid,
                'bid' => $bid,
                'url' => $url,
                'name_en' => $name_en,
                'name_kr' => $name_kr,
                'product_code' => $product_code,
                'item_code' => $item_code,
                'item_status' => $item_status,
                'color' => $color,
                'size' => $size,
                'size_detail' => $size_detail,
                'material' => $material,
                'purchase_price' => $purchase_price,
                'sales_price' => $sales_price,
                'discount_rate' => $discount_rate,
                'stock' => $stock,
                'note' => $note,
                //'image_path' => null,
            ];
            
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
                'data' => $product,
                'updateError' => true,
                'errors' => $validator->errors(),
                // 'updateErrorData' => [ "aa" ],
                // 'updateErrorData' => $validator->errors()->toArray(),
                'updateErrorData' => $errors,
            ]);
        }

        $upsertRecord = [
            // 'nid' => $nid,
            'pid' => $pid,
            'bid' => $bid,
            'url' => $url,
            'name_en' => $name_en,
            'name_kr' => $name_kr,
            'product_code' => $product_code,
            'item_code' => $item_code,
            'item_status' => $item_status,
            'color' => $color,
            'size' => $size,
            'size_detail' => $size_detail,
            'material' => $material,
            'purchase_price' => $purchase_price,
            'sales_price' => $sales_price,
            'discount_rate' => $discount_rate,
            'stock' => $stock,
            'note' => $note,
            //'image_path' => null,
        ];

        $pass = '';

        if(empty($id)){
            $pass = '1';
            $upsertRecord['created_at'] =  new Carbon('now');
            $id = DB::table('products')->insertGetId($upsertRecord);

        } else {
            $pass = '2';
            DB::table('products')->where('id', $id)->update($upsertRecord);
        }
        // $insertedId = DB::table('news')->updateOrInsert(['nid'=>$nid],$news);


        //dd($ids);
        //$upserted_nid = $nid;
        // $oldFiles = Storage::allFiles("public/news/{$upserted_nid}");
        // foreach ( $oldFiles as $oldFile ) {
        //     Storage::delete($oldFile);
        // }
        //ファイルの保存
        // $file->storeAs("public/news/{$upserted_nid}", 'news.png');

        $dummy_path = '';//$request->input('dummy_path');
        if ($request->product_file) {
            $file = $request->product_file;
            // Storage::delete("public/products", $id . '.png');
            // $file->storeAs("public/products", $id . '.png');
            Storage::delete("public", $id . '.png');
            $file->storeAs("public", $id . '.png');
        }

        // データ取得
        $product = DB::table('products')->where('id', $id)->first(); 

        return new JsonResponse([
            'id' => $id,
            'data' => $product,
            'serverError' => false,
        ]);

    }

}
