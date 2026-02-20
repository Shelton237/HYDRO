<?php

namespace Database\Seeders;

use App\Models\AboutSection;
use Illuminate\Database\Seeder;

class AboutSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AboutSection::query()->updateOrCreate(
            ['id' => 1],
            [
                'subtitle' => 'À propos',
                'title' => 'Expert hydraulique camerounais depuis 2008',
                'highlight' => 'Satisfaction assurée',
                'description' => "Créée en 2008 à Douala avec un capital de 2 000 000 F CFA, Cameroun Hydraulique SARL fournit flexibles, raccords, matériel de soudure et pièces d'engins à travers le Cameroun et l'Afrique Centrale. Notre objectif est d'apporter les pièces hydrauliques et de rechange adaptées à chaque secteur, avec un respect rigoureux de la qualité, des réceptions et livraisons promptes, un parc de matériels roulants pour les urgences et l'emploi de jeunes camerounais qualifiés.",
                'background_image' => '/img/about/03.png',
                'button_label' => 'Découvrir nos solutions',
                'button_url' => '/produit',
                'icon_one_title' => 'Respect qualité & réactivité',
                'icon_one_description' => 'Contrôles EN/ISO, réception et livraisons sous 24h depuis Douala et Yaoundé.',
                'icon_two_title' => 'Parc roulant & équipes',
                'icon_two_description' => 'Matériels d'urgence et hydrauliciens camerounais dynamiques au service de vos secteurs.',
                'author_name' => 'Équipe Cameroun Hydraulique',
                'author_title' => 'Hydrauliciens certifiés',
                'author_image' => '/img/about/author.png',
            ],
        );
    }
}
