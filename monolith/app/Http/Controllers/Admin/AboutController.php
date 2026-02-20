<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AboutRequest;
use App\Models\AboutSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function edit(): Response
    {
        $about = AboutSection::query()->first();

        if (! $about) {
            $about = AboutSection::create([
                'subtitle' => 'About Us',
                'title' => 'Welcome To Solaren Solar Power',
                'highlight' => 'Energy System',
                'description' => 'It is a long established fact that a reader will be distracted the readable content of a page when looking at layout the point.',
                'background_image' => '/img/about/03.png',
                'button_label' => 'Explore More',
                'button_url' => '/about',
                'icon_one_title' => 'Energy System',
                'icon_one_description' => 'Aliquam erat volutpat Nullam imperdiet',
                'icon_two_title' => 'Evergreen Sun',
                'icon_two_description' => 'Ut vehiculadictumst. Maecenas ante.',
                'author_name' => 'Ronald Richards',
                'author_title' => 'Co, Founder',
                'author_image' => '/img/about/author.png',
            ]);
        }

        return Inertia::render('admin/about/Edit', [
            'about' => $about,
        ]);
    }

    public function update(AboutRequest $request): RedirectResponse
    {
        $about = AboutSection::query()->firstOrFail();

        $data = $request->validated();

        if ($request->hasFile('background_upload')) {
            $path = $request->file('background_upload')->store('about', 'public');
            $data['background_image'] = Storage::disk('public')->url($path);
        }

        if ($request->hasFile('author_upload')) {
            $path = $request->file('author_upload')->store('about', 'public');
            $data['author_image'] = Storage::disk('public')->url($path);
        }

        unset($data['background_upload'], $data['author_upload']);

        $about->update($data);

        return redirect()
            ->back()
            ->with('success', 'Section About mise à jour.');
    }
}
