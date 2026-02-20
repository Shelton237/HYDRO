<?php

namespace Database\Seeders;

use App\Models\FooterSetting;
use Illuminate\Database\Seeder;

class FooterSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FooterSetting::query()->updateOrCreate(
            ['id' => 1],
            [
                'contact_phone' => '(+237) 674 048 225',
                'contact_whatsapp' => '(+237) 696 781 077',
                'contact_email' => 'contact@camerounhydraulique.com • cameroun.hydraulique@yahoo.fr',
                'contact_address' => 'Douala : entre Texaco Nkolouloun et Carrefour Photo Golden (face Boulangerie de luxe) • Douala Yassa : entrée salle de fête BOCOM • Yaoundé : face Tradex Olembe • BP 9593 Douala Cameroun',
                'footer_description' => 'Flexibles hydrauliques sur mesure, accessoires, pièces d’engins, matériel de soudure et services livrés sous 24h à Douala, Yaoundé et en Afrique Centrale.',
                'quick_links' => [
                    ['text' => 'Accueil', 'link' => '/'],
                    ['text' => 'Catalogue', 'link' => '/produit'],
                    ['text' => 'À propos', 'link' => '/about'],
                    ['text' => 'FAQ', 'link' => '/faq'],
                    ['text' => 'Contact', 'link' => '/contact'],
                ],
                'services' => [
                    ['text' => 'Flexibles sur mesure', 'link' => '/produit'],
                    ['text' => 'Accessoires hydrauliques', 'link' => '/produit'],
                    ['text' => "Pièces d'engins", 'link' => '/produit'],
                    ['text' => 'Prestations atelier', 'link' => '/contact'],
                    ['text' => 'Maintenance sur site', 'link' => '/contact'],
                ],
                'recent_posts' => [
                    [
                        'image' => '/img/news/pp1.jpg',
                        'date' => 'Process flexibles 4SH',
                        'title' => 'Sertissage 340 T & dépollution par pistolet à balle',
                        'link' => '/produit',
                    ],
                    [
                        'image' => '/img/news/pp2.jpg',
                        'date' => 'Agences Cameroun HY',
                        'title' => 'Douala (Texaco / Yassa) & Yaoundé Olembe à votre service',
                        'link' => '/contact',
                    ],
                ],
                'facebook_url' => '#',
                'twitter_url' => '#',
                'linkedin_url' => '#',
                'youtube_url' => '#',
                'copyright_text' => '© 2025 Cameroun Hydraulique SARL',
            ],
        );
    }
}
