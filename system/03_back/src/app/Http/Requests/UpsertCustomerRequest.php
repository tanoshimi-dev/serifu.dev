<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertCustomerRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'mu_mnumber'           => 'required|string|max:6',
            'mu_username'          => 'required|string|max:40',
            'mu_usernamek'         => 'nullable|string|max:40',
            'mu_userperseon'       => 'nullable|string|max:10',
            'mu_tel'               => 'nullable|string|max:15',
            'mu_zipcode'           => 'nullable|string|max:10',
            'mu_addrepref'         => 'nullable|string|max:10',
            'mu_addrecity'         => 'nullable|string|max:50',
            'mu_kisyucode'         => 'required|string|max:10',
            'mu_shitencode'        => 'nullable|string|max:4',
            'mu_deliveryperson'    => 'nullable|string|max:10',
            'mu_deliveryyear'      => 'nullable|string|max:4',
            'mu_dealername'        => 'nullable|string|max:10',
            'mu_dealerperson'      => 'required|string|max:10',
            'mu_hosyucode'         => 'required|string|max:4',
            'mu_nextyear'          => 'required|string|max:4',

            'tm_usercode'          => 'nullable|string|max:4',
            'tm_itemcode'          => 'nullable|string|max:4',
            'tm_acceptyear'        => 'nullable|string|max:4',
            'tm_acceptname'        => 'nullable|string|max:10',
            'tm_ctmplateyear'      => 'nullable|string|max:4',
            'tm_errorcode'         => 'nullable|string|max:4',
            'tm_repaircont'        => 'nullable|string|max:256',
            'tm_workyear'          => 'nullable|string|max:4',
            'tm_workperson'        => 'nullable|string|max:10',
            'tm_exchangeparts'     => 'nullable|string|max:20',
            'tm_oxygendensity'     => 'nullable|string|max:6',
            'tm_oxygenflow'        => 'nullable|string|max:6',
            'tm_psapress_u'        => 'nullable|string|max:6',
            'tm_psapress_l'        => 'nullable|string|max:6',
            'tm_prover'            => 'nullable|string|max:6',
            'tm_regularcheck'      => 'nullable|string|max:1',
            'tm_workmemo'          => 'nullable|string|max:256',
            'tm_userctmment'       => 'nullable|string|max:256',
            'tm_pdffilecheck'      => 'nullable|string|max:1',
            'tm_pdffname_local'    => 'nullable|string|max:256',
            'tm_pdffname_server'   => 'nullable|string|max:256',

        ];
    }


    public function attributes()
    {
        return [
            'mu_mnumber'           => '機番',
            'mu_username'          => '顧客名',
            'mu_usernamek'         => '顧客名（カナ）',
            'mu_dealerperson'      => '顧客担当者',
            'mu_tel'               => '電話番号',
            'mu_zipcode'           => '郵便番号',
            'mu_addrepref'         => '住所（県）',
            'mu_addrecity'         => '住所（市区町村以下）',
            'mu_kisyucode'         => '機種',
            'mu_shitencode'        => '担当支店',
            'mu_deliveryperson'    => '納入担当者',
            'mu_deliveryyear'      => '納入日',
            'mu_dealername'        => 'ディーラー名',
            'mu_dealerperson'      => '納入担当者',
            'mu_hosyucode'         => '点検契約',
            'mu_nextyear'          => '納入次回点検予定日',

            'tm_usercode'          => '顧客番号',
            'tm_itemcode'          => 'メンテ項目',
            'tm_acceptyear'        => '受付日',
            'tm_acceptname'        => '受付者',
            'tm_ctmplateyear'      => '完了日',
            'tm_errorcode'         => 'エラー内容',
            'tm_repaircont'        => '修理内容',
            'tm_workyear'          => '作業日',
            'tm_workperson'        => '作業者',
            'tm_exchangeparts'     => '交換部品',
            'tm_oxygendensity'     => '酸素濃度',
            'tm_oxygenflow'        => '酸素流量',
            'tm_psapress_u'        => 'PSA圧力（上）',
            'tm_psapress_l'        => 'PSA圧力（下）',
            'tm_prover'            => 'Pro.Ver',
            'tm_regularcheck'      => '定期点検',
            'tm_workmemo'          => '作業特記',
            'tm_userctmment'       => 'お客様コメント',
            'tm_pdffilecheck'      => 'PDFﾌｧｲﾙ有無',
            'tm_pdffname_local'    => 'PDFﾌｧｲﾙ名称（ローカル）',
            'tm_pdffname_server'   => 'PDFﾌｧｲﾙ名称（サーバー）',            
        ];
    }

    public function messages()
    {
        return [
            '*.max'               => ':attribute は :max 文字以内で入力してください。',
            '*.required'          => ':attribute を入力してください。',
        ];
    }

}