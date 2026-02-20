<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'icon_path',
        'link_url',
        'animation_delay',
        'is_featured',
        'position',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'position' => 'integer',
    ];
}
