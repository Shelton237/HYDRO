<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'kicker',
        'title',
        'description',
        'primary_label',
        'primary_url',
        'secondary_label',
        'secondary_url',
        'background_image',
    ];
}
