<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertBrandRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'id' => 'nullable|integer',
            'bid' => 'required|string|max:25',
            'name' => 'required|string|max:255',
            'new_password' => 'nullable|string',
            'contract_start_date' => 'nullable|date',
            'contract_end_date' => 'nullable|date|after_or_equal:contract_start_date',
        ];
    }
}