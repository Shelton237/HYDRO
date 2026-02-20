<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Flexibles hydrauliques tous diamètres',
                'slug' => 'flexibles-hydrauliques-tous-diametres',
                'sku' => 'HY-FLEX-01',
                'status' => 'active',
                'currency' => 'XAF',
                'price' => 95000,
                'stock' => 320,
                'image_url' => '/img/project/05.jpg',
                'excerpt' => 'Tuyaux 1/4" à 2" 4SH, dépollués et marqués selon les normes EN & ISO.',
                'description' => 'Plus de 1 500 références sont disponibles en atelier pour couvrir toutes les pressions, fluides et rayons de courbure. Sertissage jusqu\'à 4" 4SH (340 T) avec nettoyage par pistolet à balle et marquage permanent pour garantir la traçabilité.',
            ],
            [
                'name' => 'Douilles à sertir multi-diamètres',
                'slug' => 'douilles-a-sertir',
                'sku' => 'HY-JUPE-02',
                'status' => 'active',
                'currency' => 'XAF',
                'price' => 18000,
                'stock' => 520,
                'image_url' => '/img/project/06.jpg',
                'excerpt' => 'Jupes 1/4" (06) à 2" (51) compatibles avec nos flexibles et presses.',
                'description' => 'Douilles trempées pour flexibles mono et multi-spirales, livrées avec fiches techniques et repères de sertissage. Disponibles en finition zinc ou inox selon les environnements corrosifs.',
            ],
            [
                'name' => "Embouts à sertir et adaptateurs",
                'slug' => 'embouts-a-sertir-adaptateurs',
                'sku' => 'HY-EMB-03',
                'status' => 'active',
                'currency' => 'XAF',
                'price' => 42000,
                'stock' => 410,
                'image_url' => '/img/project/07.jpg',
                'excerpt' => 'Embouts DIN, BSP, ORFS, US et brides droits/coudés prêts à monter.',
                'description' => 'Chaque embout est contrôlé avant expédition et peut recevoir un gravage spécial (plaque alu/inox ou jupe marquée) pour faciliter la maintenance terrain.',
            ],
            [
                'name' => 'Coupleurs à bille et à clapet',
                'slug' => 'coupleurs-bille-clapet',
                'sku' => 'HY-COUP-04',
                'status' => 'active',
                'currency' => 'XAF',
                'price' => 60000,
                'stock' => 275,
                'image_url' => '/img/project/08.jpg',
                'excerpt' => 'Sélection de coupleurs haute pression pour engins et lignes mobiles.',
                'description' => 'Modèles à bille ou clapet anti-retour, versions push/pull et configurations pompiers pour sécuriser les opérations de montage et de dépannage.',
            ],
            [
                'name' => 'Durites et flexibles industriels',
                'slug' => 'durites-flexibles-industriels',
                'sku' => 'HY-DUR-05',
                'status' => 'active',
                'currency' => 'XAF',
                'price' => 52000,
                'stock' => 360,
                'image_url' => '/img/project/09.jpg',
                'excerpt' => 'Durites pour fluides techniques, air, carburant et solutions synthétiques.',
                'description' => 'Gaines résistantes aux hautes températures et aux hydrocarbures, parfaites pour les lignes industrielles et les installations fixes.',
            ],
            [
                'name' => 'Flexibles pour karcher et lance',
                'slug' => 'flexibles-karcher-lance',
                'sku' => 'HY-NET-06',
                'status' => 'active',
                'currency' => 'XAF',
                'price' => 28000,
                'stock' => 190,
                'image_url' => '/img/project/10.jpg',
                'excerpt' => 'Flexibles haute pression pour nettoyage, lance incendie et équipements spéciaux.',
                'description' => 'Conçus pour résister aux vibrations, aux enrouleurs fréquents et aux produits de lavage agressifs.',
            ],
            [
                'name' => 'Raccords rapides, union et pompiers',
                'slug' => 'raccords-rapides-union-pompiers',
                'sku' => 'HY-RAC-07',
                'status' => 'active',
                'currency' => 'XAF',
                'price' => 48000,
                'stock' => 260,
                'image_url' => '/img/project/11.jpg',
                'excerpt' => 'Raccords symétriques, unions et solutions rapides pour vos réseaux.',
                'description' => 'Disponibles en aluminium, laiton ou acier, avec joints adaptés à l\'huile, à l\'eau ou aux fluides spéciaux.',
            ],
            [
                'name' => 'Vannes et blocs de distribution',
                'slug' => 'vannes-blocs-distribution',
                'sku' => 'HY-VAN-08',
                'status' => 'active',
                'currency' => 'XAF',
                'price' => 115000,
                'stock' => 145,
                'image_url' => '/img/project/12.jpg',
                'excerpt' => 'Commandes, vannes et blocs prêts à intégrer vos lignes hydrauliques.',
                'description' => 'Solutions modulaires compatibles ISO 4401 avec options de pilotage électrique, pneumatique ou manuel pour vos équipements.',
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['slug' => $product['slug']], $product);
        }
    }
}
