<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    protected $fillable = [
        'contact_phone',
        'contact_whatsapp',
        'contact_email',
        'contact_address',
        'footer_description',
        'quick_links',
        'services',
        'recent_posts',
        'facebook_url',
        'twitter_url',
        'linkedin_url',
        'youtube_url',
        'copyright_text',
    ];

    protected $casts = [
        'quick_links' => 'array',
        'services' => 'array',
        'recent_posts' => 'array',
    ];
}
