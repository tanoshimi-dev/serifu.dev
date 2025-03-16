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
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $bid = $request->input('bid');
        $text = $request->input('text');

        $query = DB::table('products')
            ->join('brands', 'products.bid', '=', 'brands.bid')
            ->select('products.*', 'brands.name as brand_name');
        
        if (!empty($bid)) {
            $query = $query->where('brands.bid', $bid);
        }

        $list = $query->get();
        
        // $list = DB::table('products')
        //     ->join('brands', 'products.bid', '=', 'brands.bid')
        //     ->select('products.*', 'brands.name as brand_name')        
        //     ->get();


        //dd($list->first()->status->status_name);
        // データ取得
        // $users = User::get();
        return new JsonResponse([
            'data' => $list,
        ]);
    }

    public function upload(Request $request): JsonResponse {

        $bid = $request->input('bid');
        $text = $request->input('text');

        [$csvData, $errorData] = $this->loadProductsCsv($request->products_file);
        
        $updateError = true;
        if (count($errorData) == 0) {
            if (count($csvData) > 0) {
                DB::table('products')->insert($csvData);
                $updateError = false;
            } else {
                // 登録対象データが無い場合
                $updateError = true;
                $errorData[] = '登録対象データがありません';
            }
        }

        // データ取得
        $query = DB::table('products')
            ->join('brands', 'products.bid', '=', 'brands.bid')
            ->select('products.*', 'brands.name as brand_name');
        
        if (!empty($bid)) {
            $query = $query->where('brands.bid', $bid);
        }

        $products = $query->get();
        // $products = DB::table('products')->get();

        return new JsonResponse([
            'updateErrorData' => $errorData,
            'data' => $products,
            'updateError' => $updateError,
        ]);
        
    }


    public function delete(Request $request): JsonResponse {

        $ids = $request->input('ids');
        $ids_array = explode(',', $ids);

        $updateError = false;
        $updateErrorData = [];

        if ( $ids != null && count($ids_array) > 0) {

            // 既に注文データで使用されている商品が無いかチェック
            $errorData = [];
            foreach ($ids_array as $id) {
                $product = DB::table('products')->where('id', $id)->first();
                $order = DB::table('orders')
                    ->where('product_code', $product->product_code)
                    ->where('item_code', $product->item_code)
                    ->first();
                                
                if (!empty($order)) {
                    $updateError = true;
                    $updateErrorData[] = "商品データID：{$id} は、注文データで使用されているため削除できません";
                }

            }

            // エラーが無い場合、削除実行
            if (!$updateError) {
                DB::table('products')->whereIn("id", $ids_array)->delete();
            }

        }

        // データ取得
        $products = DB::table('products')->get();

        return new JsonResponse([
            'data' => $products,
            'updateError' => $updateError,         
            'updateErrorData' => $updateErrorData,         
        ]);
        
    }

    private function loadProductsCsv($file) : array{

        $oldFiles = Storage::allFiles('public/csv/');
        foreach ( $oldFiles as $oldFile ) {
            Storage::delete($oldFile);
        }
        //ファイルの保存
        $newCsvFileName = $file->getClientOriginalName();
        $file->storeAs('public/csv', $newCsvFileName);
        
        //保存したCSVファイルの取得
        $csv = Storage::disk('local')->get("public/csv/{$newCsvFileName}");
        // OS間やファイルで違う改行コードをexplode統一
        //$csv = str_replace(array("\r\n", "\r"), "\n", $csv);
        // $csvを元に行単位のコレクション作成。explodeで改行ごとに分解
        //$csvData = collect(explode("\n", $csv));
        //$csvData = collect(explode("\r\n", $csv));

        // CSV情報の取得
        $csv_content = new \SplFileObject(storage_path('app/public/csv/'.$newCsvFileName));
 
        $csv_content->setFlags(
            \SplFileObject::READ_CSV |      // CSVとして行を読み込み
            \SplFileObject::READ_AHEAD |    // 先読み／巻き戻しで読み込み
            \SplFileObject::SKIP_EMPTY |    // 空行を読み飛ばす
            \SplFileObject::DROP_NEW_LINE   // 行末の改行を読み飛ばす
        );        

        // 配列に変換
        $csv_data = [];
        $error_data = [];
        
        //dd($csv_content);

        foreach($csv_content as $value) {

            // 文字コード変換
            $value = mb_convert_encoding($value, "UTF-8");

            // 先頭行（項目行）を省く
            if(strpos($value[0], '商品ID') !== false){
                continue;
            }

            $csv_data[] = [
                'pid' => empty($value[0])? null : strval($value[0]),
                'bid' => empty($value[1])? null : strval($value[1]),
                'url' => empty($value[2])? null : strval($value[2]),
                'product_code' => empty($value[3])? null : strval($value[3]),
                'name_kr' => empty($value[4])? null : strval($value[4]),
                'name_en' => empty($value[5])? null : strval($value[5]),
                'color' => empty($value[6])? null : strval($value[6]),
                'item_code' => empty($value[7])? null : strval($value[7]),
                'size' => empty($value[8])? null : strval($value[8]),
                'material' => empty($value[9])? null : strval($value[9]),
                'purchase_price' => empty($value[10])? null : $value[10],
                'sales_price' => empty($value[11])? null : $value[11],
                'size_detail' => empty($value[12])? null : strval($value[12]),
                'stock' => empty($value[13])? null : $value[13],
                'note' => empty($value[14])? null : strval($value[14]),
                'discount_rate' => empty($value[15])? null : $value[15],
            ];
            
        }
        
        //dd($csv_data);
        $error_data = $this->validateProductsCsv($csv_data);


        return [$csv_data,$error_data];

    }


    private function validateProductsCsv($csv_data) {

        $errors = [];
        $duplicateCheckarray = [];

        foreach($csv_data as $key => $value) {
            
            $rowNumber = ($key+1) . '行目 ';
            $errorMessage = '';

            // ブランドID
            if (empty($value['bid']) || (mb_strlen($value['bid']) > 20)) {
                $errorMessage = $errorMessage. 'ブランドIDは、20文字以内で入力してください　';
            } else {
                $brand = DB::table('brands')->where('bid', $value['bid'])->first();
                if (empty($brand)) {
                    $errorMessage = $errorMessage. 'ブランドが存在しません　';
                }
            }

            // 独自商品コード
            if (empty($value['product_code']) ||
                (!empty($value['product_code']) && (mb_strlen($value['product_code']) > 25)) ) {
                $errorMessage = $errorMessage. '独自商品コードは、25文字以内で入力してください　';
            }

            // 独自品目コード
            if (empty($value['item_code']) ||
                (!empty($value['item_code']) && (mb_strlen($value['item_code']) > 25)) ) {
                $errorMessage = $errorMessage. '独自品目コードは、25文字以内で入力してください　';
            }

            // 独自商品コードと独自品目コードに対応する商品が存在しません
            if (!empty($value['product_code']) && !empty($value['item_code'])) {
                $product = DB::table('products')
                    ->where('product_code', $value['product_code'])
                    ->where('item_code', $value['item_code'])->first();
                
                if (!empty($product)) {
                    $errorMessage = $errorMessage. "既に該当の商品が登録されています。データID：{$product->id}";
                }
            }

            $checkKey = $value['product_code'] . "-" .$value['item_code'];
            // ファイルの中に同じ商品が存在する場合
            if (in_array($checkKey, $duplicateCheckarray)) {
                $errorMessage = $errorMessage. "同じ商品が複数存在します";
            } else {
                $duplicateCheckarray[] = $checkKey;
            }

            // 自社価格(円)
            if (empty($value['purchase_price']) ||
                (!empty($value['purchase_price']) && (!is_numeric($value['purchase_price']) || !(intval($value['purchase_price'])>= 0)) )) {
                $errorMessage = $errorMessage. '自社価格(円)は、0以上の整数で入力してください　';
            }

            // 販売価格(円)
            if (empty($value['sales_price']) ||
                (!empty($value['sales_price']) && (!is_numeric($value['sales_price']) || !(intval($value['sales_price'])>= 0)) )) {
                $errorMessage = $errorMessage. '販売価格(円)は、0以上の整数で入力してください　';
            }

            // 割引率
            if (!empty($value['discount_rate']) ) {    
                // 数値以外はエラー
                if (!is_numeric($value['discount_rate'])) {
                    $errorMessage = $errorMessage. '割引率は、小数点2桁までの数値で入力してください　';                    
                } else {
                    // 小数点が3桁以上の場合はエラー
                    $separatedNumberArray = explode('.', $value['discount_rate'] );
                    if ((count($separatedNumberArray)>2) ||
                        (count($separatedNumberArray)==2 && (mb_strlen($separatedNumberArray[1]) >2)) ) {
                        $errorMessage = $errorMessage. '割引率は、小数点2桁までの数値で入力してください　';
                    }
                }
            }

            // 在庫数
            if (empty($value['stock']) ||
                (!empty($value['stock']) && (!is_numeric($value['stock']) || !(intval($value['stock'])>= 0)) )) {
                $errorMessage = $errorMessage. '在庫数は、0以上の整数で入力してください　';
            }

            if ( mb_strlen($errorMessage)>0 ) {
                $errors[] = $rowNumber . " : " . $errorMessage;
            }

        }

        return $errors;
    }

}
