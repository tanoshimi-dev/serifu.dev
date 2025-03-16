<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
//use Illuminate\Support\Facades\Validator;
use Illuminate\Contracts\Validation\Validator;

class BaseRequest extends FormRequest
{

    public function authorize()
    {
        return true; // Set to true if the request is authorized
    }

    // public function validateResolved()
    // {
    //     // Do nothing to skip automatic validation
    // }

    // リダイレクトしないように空処理でオーバーライド
    protected function failedValidation(Validator $validator)
    {
        // throw new HttpResponseException(response()->json($validator->errors(), 422));
    }

    public function getValidator() {
        return $this->validator;
    }
}