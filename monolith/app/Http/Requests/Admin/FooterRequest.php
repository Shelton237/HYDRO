<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class FooterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'contact_phone' => ['nullable', 'string', 'max:255'],
            'contact_whatsapp' => ['nullable', 'string', 'max:255'],
            'contact_email' => ['nullable', 'string', 'max:255'],
            'contact_address' => ['nullable', 'string', 'max:255'],
            'footer_description' => ['nullable', 'string'],
            'quick_links' => ['nullable', 'array'],
            'quick_links.*.text' => ['nullable', 'string', 'max:255'],
            'quick_links.*.link' => ['nullable', 'string', 'max:255'],
            'services' => ['nullable', 'array'],
            'services.*.text' => ['nullable', 'string', 'max:255'],
            'services.*.link' => ['nullable', 'string', 'max:255'],
            'recent_posts' => ['nullable', 'array'],
            'recent_posts.*.image' => ['nullable', 'string', 'max:255'],
            'recent_posts.*.date' => ['nullable', 'string', 'max:255'],
            'recent_posts.*.title' => ['nullable', 'string', 'max:255'],
            'recent_posts.*.link' => ['nullable', 'string', 'max:255'],
            'facebook_url' => ['nullable', 'string', 'max:255'],
            'twitter_url' => ['nullable', 'string', 'max:255'],
            'linkedin_url' => ['nullable', 'string', 'max:255'],
            'youtube_url' => ['nullable', 'string', 'max:255'],
            'copyright_text' => ['nullable', 'string', 'max:255'],
        ];
    }
}
