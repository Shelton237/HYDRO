<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeSection extends Model
{
    protected $fillable = [
        'identifier',
        'label',
        'order',
        'is_visible',
        'title',
        'subtitle',
        'description',
        'image_path',
        'icon_path',
        'metadata',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
        'metadata' => 'array',
    ];

    public function getRouteKeyName(): string
    {
        return 'identifier';
    }
}
