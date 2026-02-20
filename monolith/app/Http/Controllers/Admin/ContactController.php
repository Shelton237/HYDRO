<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ContactRequest;
use App\Models\ContactPage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function edit(): Response
    {
        $contact = ContactPage::query()->first();

        if (! $contact) {
            $contact = ContactPage::create([]);
        }

        return Inertia::render('admin/contact/Edit', [
            'contact' => $contact,
        ]);
    }

    public function update(ContactRequest $request): RedirectResponse
    {
        $contact = ContactPage::query()->firstOrFail();
        $data = $request->validated();

        if ($request->hasFile('banner_upload')) {
            $path = $request->file('banner_upload')->store('contact', 'public');
            $data['banner_image'] = Storage::disk('public')->url($path);
        }

        if ($request->hasFile('video_upload')) {
            $path = $request->file('video_upload')->store('contact', 'public');
            $data['video_image'] = Storage::disk('public')->url($path);
        }

        unset($data['banner_upload'], $data['video_upload']);

        $contact->update($data);

        return redirect()
            ->back()
            ->with('success', 'Section Contact mise à jour.');
    }
}
