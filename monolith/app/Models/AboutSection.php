<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
    protected $fillable = [
        'subtitle',
        'title',
        'highlight',
        'description',
        'background_image',
        'button_label',
        'button_url',
        'icon_one_title',
        'icon_one_description',
        'icon_two_title',
        'icon_two_description',
        'author_name',
        'author_title',
        'author_image',
    ];
}
