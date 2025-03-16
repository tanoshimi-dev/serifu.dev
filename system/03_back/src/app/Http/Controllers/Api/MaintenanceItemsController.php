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
use Inertia\Inertia;
use Inertia\Response;

class MaintenanceItemsController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $maintenanceItems = DB::table('m_maintenanceitem')->get();
        // データ取得
        return new JsonResponse([
            'maintenanceItems' => $maintenanceItems,
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function upsert(Request $request): JsonResponse
    {

        $id = $request->input('id');
        $pid = $request->input('pid');

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

        if(empty($id)){
            $pass = '1';
            $upsertRecord['created_at'] =  new Carbon('now');
            $id = DB::table('products')->insertGetId($upsertRecord);

        } else {
            $pass = '2';
            DB::table('products')->where('id', $id)->update($upsertRecord);
        }

        // データ取得
        $maintenanceItems = DB::table('m_maintenanceitem')->get();
        
        return new JsonResponse([
            'maintenanceItems' => $maintenanceItems,
            'serverError' => false,
        ]);

    }


}
