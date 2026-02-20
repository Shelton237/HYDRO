<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'Vente des accessoires hydrauliques',
                'description' => 'Stock permanent de coupleurs, adaptateurs, joints et consommables pour toutes les pressions.',
                'icon_path' => '/img/service/icon/s-icon-1.svg',
                'link_url' => '/produit',
                'animation_delay' => '.3',
                'is_featured' => false,
            ],
            [
                'title' => "Vente des pièces d'engins",
                'description' => 'Pièces de rechange pour engins BTP, forestiers et logistiques livrées en urgence.',
                'icon_path' => '/img/service/icon/s-icon-2.svg',
                'link_url' => '/contact',
                'animation_delay' => '.4',
                'is_featured' => false,
            ],
            [
                'title' => 'Vente du matériel de soudure',
                'description' => 'Postes, torches et consommables de soudure adaptés aux ateliers et chantiers.',
                'icon_path' => '/img/service/icon/s-icon-3.svg',
                'link_url' => '/produit',
                'animation_delay' => '.5',
                'is_featured' => false,
            ],
            [
                'title' => 'Fournitures du matériel hydraulique',
                'description' => 'Pompes, vérins, vannes, distributions et équipements conformes aux normes EN et ISO.',
                'icon_path' => '/img/service/icon/s-icon-4.svg',
                'link_url' => '/produit',
                'animation_delay' => '.6',
                'is_featured' => false,
            ],
            [
                'title' => 'Confection des flexibles hydrauliques',
                'description' => 'Sertissage sur mesure jusqu\'a 4" 4SH (340 T) avec dépollution par pistolet à balle.',
                'icon_path' => '/img/service/icon/s-icon-5.svg',
                'link_url' => '/produit',
                'animation_delay' => '.7',
                'is_featured' => true,
            ],
            [
                'title' => 'Prestations de services',
                'description' => 'Conseils d\'hydrauliciens, maintenance sur site et interventions urgentes avec parc roulant.',
                'icon_path' => '/img/service/icon/s-icon-8.svg',
                'link_url' => '/contact',
                'animation_delay' => '.8',
                'is_featured' => false,
            ],
        ];

        foreach ($services as $index => $service) {
            Service::query()->updateOrCreate(
                ['slug' => Str::slug($service['title'])],
                array_merge($service, ['position' => $index + 1])
            );
        }
    }
}
