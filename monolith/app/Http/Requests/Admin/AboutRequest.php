<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AboutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'subtitle' => ['nullable', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'highlight' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'background_image' => ['nullable', 'string', 'max:255'],
            'background_upload' => ['nullable', 'image', 'max:5120'],
            'button_label' => ['nullable', 'string', 'max:255'],
            'button_url' => ['nullable', 'string', 'max:255'],
            'icon_one_title' => ['nullable', 'string', 'max:255'],
            'icon_one_description' => ['nullable', 'string'],
            'icon_two_title' => ['nullable', 'string', 'max:255'],
            'icon_two_description' => ['nullable', 'string'],
            'author_name' => ['nullable', 'string', 'max:255'],
            'author_title' => ['nullable', 'string', 'max:255'],
            'author_image' => ['nullable', 'string', 'max:255'],
            'author_upload' => ['nullable', 'image', 'max:5120'],
        ];
    }
}
