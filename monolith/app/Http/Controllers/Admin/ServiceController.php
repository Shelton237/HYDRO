<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceRequest;
use App\Models\Service;
use App\Support\MediaPath;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::query()->orderBy('position')->get();

        return Inertia::render('admin/services/index', [
            'services' => $services,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/services/create');
    }

    public function store(ServiceRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('icon_upload')) {
            Storage::disk('public')->makeDirectory('services');
            $path = $request->file('icon_upload')->store('services', 'public');
            $data['icon_path'] = MediaPath::toPublicPath($path);
        } else {
            $data['icon_path'] = '/img/service/icon/s-icon-1.svg';
        }

        unset($data['icon_upload']);

        $data = $this->prepareData($data);
        Service::create($data);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service créé.');
    }

    public function edit(Service $service): Response
    {
        if ($service->icon_path) {
            $normalizedIcon = MediaPath::normalize($service->icon_path);

            if ($normalizedIcon !== $service->icon_path) {
                $service->update(['icon_path' => $normalizedIcon]);
                $service->refresh();
            }
        }

        return Inertia::render('admin/services/edit', [
            'service' => $service,
        ]);
    }

    public function update(ServiceRequest $request, Service $service): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('icon_upload')) {
            Storage::disk('public')->makeDirectory('services');
            $path = $request->file('icon_upload')->store('services', 'public');
            $data['icon_path'] = MediaPath::toPublicPath($path);
        } else {
            $data['icon_path'] = $service->icon_path;
        }

        unset($data['icon_upload']);

        $data = $this->prepareData($data, $service);
        $service->update($data);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service mis à jour.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service supprimé.');
    }

    private function prepareData(array $data, ?Service $service = null): array
    {
        $title = $data['title'] ?? null;
        if (is_string($title)) {
            $title = trim($title);
        }

        if ($title === null || $title === '') {
            $data['title'] = $service?->title ?? 'Service';
        } else {
            $data['title'] = $title;
        }

        if (array_key_exists('icon_path', $data)) {
            $data['icon_path'] = MediaPath::normalize($data['icon_path']);
        }

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        if (empty($data['link_url'])) {
            $data['link_url'] = '/service-details';
        }

        if (! array_key_exists('is_featured', $data)) {
            $data['is_featured'] = false;
        }

        if (! array_key_exists('position', $data) || $data['position'] === null) {
            if ($service && $service->position !== null) {
                $data['position'] = $service->position;
            } else {
                $max = Service::query()->max('position');
                $data['position'] = is_null($max) ? 1 : $max + 1;
            }
        }

        return $data;
    }
}
