<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'description' => 'required',            
            'price' => 'required|numeric', // 'regex:/^\d{1,8}\.\d{2}$/'
            'stock' => 'integer',
            'active' => 'boolean',
            'photo' => 'image|max:' . (3 * 1024)
        ];
    }

    protected function getValidatorInstance()
    {
        $data = $this->all();
        $data['active'] = $data['active'] === 'true' ? 1 : 0;
        
        $this->getInputSource()->replace($data);

        return parent::getValidatorInstance();
    }
}
