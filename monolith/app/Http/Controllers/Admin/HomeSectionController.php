<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\HomeSectionRequest;
use App\Models\HomeSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeSectionController extends Controller
{
    public function edit(): Response
    {
        if (! Schema::hasTable('home_sections')) {
            return Inertia::render('admin/homeSections/Edit', [
                'sections' => [],
                'needsMigration' => true,
            ]);
        }

        $defaults = $this->defaultSections();

        foreach ($defaults as $identifier => $payload) {
            HomeSection::firstOrCreate(
                ['identifier' => $identifier],
                array_merge(['is_visible' => true], $payload)
            );
        }

        $sections = HomeSection::query()
            ->orderBy('order')
            ->get();

        return Inertia::render('admin/homeSections/Edit', [
            'sections' => $sections,
            'needsMigration' => false,
        ]);
    }

    public function update(HomeSectionRequest $request, HomeSection $homeSection): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image_upload')) {
            $path = $request->file('image_upload')->store('home-sections', 'public');
            $data['image_path'] = Storage::disk('public')->url($path);
        }

        if ($request->hasFile('icon_upload')) {
            $path = $request->file('icon_upload')->store('home-sections', 'public');
            $data['icon_path'] = Storage::disk('public')->url($path);
        }

        unset($data['image_upload'], $data['icon_upload']);

        $homeSection->update($data);

        return redirect()
            ->back()
            ->with('success', "Paramètres de la page d'accueil mis à jour.");
    }

    private function defaultSections(): array
    {
        return [
            'hero' => [
                'label' => 'Hero',
                'order' => 0,
                'title' => 'Satisfaction assurée en hydraulique',
                'subtitle' => 'CAMEROUN HYDRAULIQUE SARL',
                'description' => null,
                'image_path' => '/img/hero/hero-4.jpg',
                'icon_path' => null,
            ],
            'services' => [
                'label' => 'Services',
                'order' => 1,
                'title' => 'Activités & services hydrauliques',
                'subtitle' => 'Activités',
                'description' => "Vente d'accessoires hydrauliques, pièces d'engins, matériel de soudure, fournitures hydrauliques, flexibles sur mesure et prestations.",
                'image_path' => null,
                'icon_path' => null,
            ],
            'about' => [
                'label' => 'About',
                'order' => 2,
                'title' => 'À propos de Cameroun Hydraulique',
                'subtitle' => 'À propos',
                'description' => "Créée en 2008 à Douala, Cameroun Hydraulique SARL fournit flexibles, raccords et pièces de rechange aux secteurs industriels, forestiers, BTP et logistiques.",
                'image_path' => '/img/about/03.png',
                'icon_path' => null,
            ],
            'marque' => [
                'label' => 'Marquee',
                'order' => 3,
                'subtitle' => null,
                'title' => null,
            ],
            'offer' => [
                'label' => 'Offer',
                'order' => 4,
                'title' => 'Outils de service flexibles sur mesure',
                'subtitle' => 'Outils atelier',
                'description' => "Sertisseuse électrique 340 T, dénudeuse, presse, tronçonneuse, meuleuse, établi de contrôle et gravage spécial sont disponibles pour chaque commande.",
            ],
            'projects' => [
                'label' => 'Catalogue',
                'order' => 5,
                'subtitle' => 'Catalogue Cameroun HY',
                'title' => 'Flexibles, raccords et pièces prêts à livrer',
                'description' => 'Flexibles tous diamètres, flexibles industriels/synthétiques, jupes, embouts, coupleurs, durites, adaptateurs et vannes.',
            ],
            'partners' => [
                'label' => 'Partners',
                'order' => 6,
                'subtitle' => 'Partenaires & clients de référence',
                'title' => 'SMAR | BATI SERVICES | METCH ELEC | BTA | GLOBAL TRANS | HYSACAM | BOCOM | ERNO | SEFAC | TRANSAFRIQUE',
            ],
            'teams' => [
                'label' => 'Teams',
                'order' => 7,
                'subtitle' => 'Départements',
                'title' => 'Nos pôles et ateliers',
            ],
            'choose_us' => [
                'label' => 'Choose Us',
                'order' => 8,
                'subtitle' => 'Conseils & raisons',
                'title' => "Qualité, regard d'hydraulicien et possibilités étendues",
                'description' => "Composants issus de leaders mondiaux, regard d’hydraulicien, possibilités étendues (pompes, distribution, vérins, moteurs) et accompagnement par secteur.",
                'image_path' => '/img/choose/01.png',
            ],
            'achievement' => [
                'label' => 'Achievement',
                'order' => 9,
                'subtitle' => 'Mesures de performance',
                'title' => 'Qualité stricte, livraisons promptes & parc roulant',
            ],
            'home_contact' => [
                'label' => 'Home Contact',
                'order' => 10,
                'subtitle' => 'Support 24h/24',
                'title' => 'Demandez un flexible ou une pièce sur mesure',
                'description' => 'Douala : (+237) 674 048 225 • Yaoundé : (+237) 696 781 077 • BP 9593 Douala Cameroun.',
                'image_path' => '/img/contact-2.jpg',
            ],
            'testimonial' => [
                'label' => 'Testimonials',
                'order' => 11,
                'subtitle' => 'Avis clients',
                'title' => 'Ils apprécient notre réactivité',
                'image_path' => 'assets/img/testimonial/bg.jpg',
            ],
            'blogs' => [
                'label' => 'Blogs',
                'order' => 12,
                'subtitle' => 'Actualités atelier',
                'title' => "Notes d'atelier",
            ],
        ];
    }
}
