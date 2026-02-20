<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use App\Support\MediaPath;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HeroController extends Controller
{
    public function edit()
    {
        $hero = HeroSection::query()->first();

        if (! $hero) {
            $hero = HeroSection::create([
                'title' => 'Votre accroche',
                'description' => null,
            ]);
        }

        if ($hero->background_image) {
            $normalizedBackground = MediaPath::normalize($hero->background_image);

            if ($normalizedBackground !== $hero->background_image) {
                $hero->update(['background_image' => $normalizedBackground]);
                $hero->refresh();
            }
        }

        $defaultBackground = '/img/hero/hero-4.jpg';
        if ($hero->background_image && str_starts_with($hero->background_image, '/storage/')) {
            $relativePath = Str::after($hero->background_image, '/storage/');

            if (! Storage::disk('public')->exists($relativePath)) {
                $hero->update(['background_image' => $defaultBackground]);
                $hero->refresh();
            }
        }

        return Inertia::render('admin/hero/Edit', [
            'hero' => $hero,
        ]);
    }

    public function update(Request $request)
    {
        $hero = HeroSection::query()->firstOrFail();

        $data = $request->validate([
            'kicker' => ['nullable', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'primary_label' => ['nullable', 'string', 'max:255'],
            'primary_url' => ['nullable', 'string', 'max:255'],
            'secondary_label' => ['nullable', 'string', 'max:255'],
            'secondary_url' => ['nullable', 'string', 'max:255'],
            'background_image' => ['nullable', 'string', 'max:255'],
            'background_upload' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('background_upload')) {
            Storage::disk('public')->makeDirectory('hero');
            $path = $request->file('background_upload')->store('hero', 'public');
            $data['background_image'] = MediaPath::toPublicPath($path);
        }

        unset($data['background_upload']);

        $hero->update($data);

        return redirect()->back()->with('success', 'Section hero mise à jour.');
    }
}
