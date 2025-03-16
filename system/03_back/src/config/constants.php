<?php

return [
    'status' => [
        'order' => [
            'unchecked'      => 0,  // 未登録
            'checked'        => 1,  // 確認済み
            'req_in'         => 2,  // 入庫申請済み
            'req_in_shipped' => 3,  // 輸送済み
            'received'       => 4,  // 入庫確認済み
            'shipped'        => 5,  // 出荷済み
            'sold'           => 6,  // 売上確定
            'canceled'       => 91, // キャンセル
        ],
    ]
    
];
