<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertProductRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'id' => 'nullable|integer',
            'pid' => 'nullable|string|max:25',
            'bid' => 'required|string|max:25',
            'url' => 'nullable|string|max:500',
            'product_code' => 'required|string|max:25',
            'item_code' => 'required|string|max:25',
            'name_kr' => 'nullable|string|max:50',
            'name_en' => 'required|string|max:50',
            'color' => 'nullable|string|max:25',
            'size' => 'nullable|string|max:25',
            'size_detail' => 'nullable|string|max:50',
            'material' => 'nullable|string|max:50',
            'note' => 'nullable|string|max:100',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The product name is required.',
            'name.string' => 'The product name must be a string.',
            'name.max' => 'The product name may not be greater than 255 characters.',
            'description.string' => 'The description must be a string.',
            'price.required' => 'The price is required.',
            'price.numeric' => 'The price must be a number.',
            'price.min' => 'The price must be at least 0.',
            // Add other custom messages as needed
        ];
    }

}