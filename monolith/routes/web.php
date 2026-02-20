<?php

use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\FooterController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\HomeSectionController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Models\AboutSection;
use App\Models\ContactPage;
use App\Models\HeroSection;
use App\Models\HomeSection;
use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

Route::get('/', function () {
    $hero = HeroSection::query()->first();
    $services = Service::query()
        ->orderBy('position')
        ->take(8)
        ->get([
            'id',
            'title',
            'description',
            'icon_path',
            'link_url',
            'animation_delay',
            'is_featured',
        ]);
    $about = AboutSection::query()->first();

    return Inertia::render('home-two', [
        'hero' => $hero,
        'services' => $services,
        'about' => $about,
    'homeSections' => Schema::hasTable('home_sections')
        ? HomeSection::query()
            ->orderBy('order')
            ->get()
            ->mapWithKeys(fn (HomeSection $section) => [
                $section->identifier => [
                    'id' => $section->id,
                    'identifier' => $section->identifier,
                    'label' => $section->label,
                    'is_visible' => $section->is_visible,
                    'title' => $section->title,
                    'subtitle' => $section->subtitle,
                    'description' => $section->description,
                    'image_path' => $section->image_path,
                    'icon_path' => $section->icon_path,
                    'metadata' => $section->metadata,
                ],
            ])
            ->toArray()
        : [],
    ]);
})->name('home');
Route::redirect('/home-two', '/');

$pages = [
    '/service' => 'service',
    '/service-details' => 'service-details',
    '/project-carousel' => 'project-carousel',
    '/team' => 'team',
    '/team-details' => 'team-details',
    '/pricing' => 'pricing',
    '/faq' => 'faq',
    '/404' => '404',
    '/news' => 'blog',
    '/news-standard' => 'blog-standard',
    '/news-details' => 'blog-details',
    '/produit-details' => 'produit-details',
];

foreach ($pages as $uri => $component) {
    Route::get($uri, fn () => Inertia::render($component))->name(trim($uri, '/'));
}

Route::get('/produit', [ProjectController::class, 'index'])->name('produit');
Route::get('/produit/{product:slug}', [ProjectController::class, 'show'])->name('produit.details');

Route::get('/about', function () {
    $about = AboutSection::query()->first();

    return Inertia::render('about', [
        'about' => $about,
    ]);
})->name('about');

Route::get('/contact', function () {
    $contact = ContactPage::query()->first();

    return Inertia::render('contact', [
        'contact' => $contact,
    ]);
})->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::redirect('/', '/admin/products');
        Route::get('hero', [HeroController::class, 'edit'])->name('hero.edit');
        Route::put('hero', [HeroController::class, 'update'])->name('hero.update');
        Route::get('about', [AboutController::class, 'edit'])->name('about.edit');
        Route::put('about', [AboutController::class, 'update'])->name('about.update');
        Route::get('footer', [FooterController::class, 'edit'])->name('footer.edit');
        Route::put('footer', [FooterController::class, 'update'])->name('footer.update');
        Route::get('contact', [ContactController::class, 'edit'])->name('contact.edit');
        Route::put('contact', [ContactController::class, 'update'])->name('contact.update');
        Route::get('home-sections', [HomeSectionController::class, 'edit'])->name('home-sections.edit');
        Route::put('home-sections/{homeSection}', [HomeSectionController::class, 'update'])->name('home-sections.update');
        Route::resource('products', ProductController::class)->except(['show']);
        Route::resource('services', ServiceController::class)->except(['show']);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::fallback(fn () => Inertia::render('404'));

require __DIR__ . '/auth.php';
