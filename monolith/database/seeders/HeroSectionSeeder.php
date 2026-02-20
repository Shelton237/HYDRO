<?php

namespace Database\Seeders;

use App\Models\HeroSection;
use Illuminate\Database\Seeder;

class HeroSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HeroSection::query()->updateOrCreate(
            ['id' => 1],
            [
                'kicker' => 'CAMEROUN HYDRAULIQUE SARL',
                'title' => 'Satisfaction assurée en hydraulique',
                'description' => "Vente d'accessoires hydrauliques, pièces d'engins, matériel de soudure, flexibles sur mesure et prestations avec excellente qualité, réactivité et SAV assuré à Douala (Texaco Nkolouloun / Yassa) et Yaoundé (face Tradex Olembe).",
                'primary_label' => 'Consulter le catalogue',
                'primary_url' => '/produit',
                'secondary_label' => 'Contacter nos agences',
                'secondary_url' => '/contact',
                'background_image' => '/img/hero/hero-4.jpg',
            ],
        );
    }
}
