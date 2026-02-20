<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'form_title' => ['required', 'string', 'max:255'],
            'form_subtitle' => ['nullable', 'string'],
            'call_label' => ['nullable', 'string', 'max:255'],
            'call_value' => ['nullable', 'string', 'max:255'],
            'email_label' => ['nullable', 'string', 'max:255'],
            'email_value' => ['nullable', 'string', 'max:255'],
            'location_label' => ['nullable', 'string', 'max:255'],
            'location_value' => ['nullable', 'string', 'max:255'],
            'map_embed_url' => ['nullable', 'string'],
            'banner_image' => ['nullable', 'string', 'max:255'],
            'video_image' => ['nullable', 'string', 'max:255'],
            'banner_upload' => ['nullable', 'image', 'max:5120'],
            'video_upload' => ['nullable', 'image', 'max:5120'],
        ];
    }
}
