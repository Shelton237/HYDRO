<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ServiceUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_update_service_with_image(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $service = Service::create([
            'title' => 'Service initial',
            'slug' => 'service-initial',
            'description' => 'Description initiale',
            'icon_path' => '<svg></svg>',
            'link_url' => '/service-details',
            'animation_delay' => '.3',
            'is_featured' => false,
            'position' => 1,
        ]);

        $response = $this->actingAs($user)->put(
            "/admin/services/{$service->id}",
            [
                'title' => 'Service mis à jour',
                'slug' => 'service-mis-a-jour',
                'description' => 'Nouvelle description',
                'link_url' => '/nouveau-lien',
                'animation_delay' => '.5',
                'position' => 2,
                'is_featured' => true,
                'icon_upload' => UploadedFile::fake()->image('icone.png', 160, 160),
            ],
        );

        $response->assertRedirect('/admin/services');

        $service->refresh();

        $this->assertSame('Service mis à jour', $service->title);
        $this->assertSame('/nouveau-lien', $service->link_url);
        $this->assertSame('.5', $service->animation_delay);
        $this->assertTrue($service->is_featured);
        $this->assertSame(2, $service->position);
        $this->assertNotNull($service->icon_path);
        $this->assertStringStartsWith('/storage/services/', $service->icon_path);
        Storage::disk('public')->assertExists(str_replace('/storage/', '', $service->icon_path));
    }

    public function test_admin_can_update_service_via_post_override(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $service = Service::create([
            'title' => 'Service initial',
            'slug' => 'service-initial',
            'description' => 'Description initiale',
            'icon_path' => '/img/service/icon/s-icon-1.svg',
            'link_url' => '/service-details',
            'animation_delay' => '.3',
            'is_featured' => false,
            'position' => 1,
        ]);

        $response = $this->actingAs($user)->post(
            "/admin/services/{$service->id}",
            [
                '_method' => 'put',
                'title' => 'Service override',
                'slug' => 'service-override',
                'description' => 'Override description',
                'link_url' => '/override',
                'animation_delay' => '.6',
                'position' => 4,
                'is_featured' => false,
                'icon_upload' => UploadedFile::fake()->image('override.png', 80, 80),
            ],
        );

        $response->assertRedirect('/admin/services');

        $service->refresh();
        $this->assertSame('Service override', $service->title);
        Storage::disk('public')->assertExists(str_replace('/storage/', '', $service->icon_path));
    }
}
