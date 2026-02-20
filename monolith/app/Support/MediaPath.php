<?php

namespace App\Support;

use Illuminate\Support\Str;

class MediaPath
{
    public static function toPublicPath(string $path): string
    {
        return '/storage/' . ltrim($path, '/');
    }

    public static function normalize(?string $value): ?string
    {
        if (! $value) {
            return $value;
        }

        $normalized = trim($value);

        if ($normalized === '') {
            return null;
        }

        if (Str::startsWith($normalized, '/storage/')) {
            return $normalized;
        }

        if (Str::startsWith($normalized, 'storage/')) {
            return '/' . ltrim($normalized, '/');
        }

        if (Str::startsWith($normalized, ['http://', 'https://'])) {
            $parsed = parse_url($normalized, PHP_URL_PATH);

            if (is_string($parsed) && $parsed !== '') {
                return Str::startsWith($parsed, '/storage/')
                    ? $parsed
                    : '/' . ltrim($parsed, '/');
            }
        }

        return $normalized;
    }
}
