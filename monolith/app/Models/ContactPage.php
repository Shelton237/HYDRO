<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactPage extends Model
{
    protected $fillable = [
        'form_title',
        'form_subtitle',
        'call_label',
        'call_value',
        'email_label',
        'email_value',
        'location_label',
        'location_value',
        'map_embed_url',
        'banner_image',
        'video_image',
    ];
}
