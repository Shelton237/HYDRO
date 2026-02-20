<?php

namespace Database\Seeders;

use App\Models\ContactPage;
use Illuminate\Database\Seeder;

class ContactPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContactPage::query()->updateOrCreate(
            ['id' => 1],
            [
                'form_title' => 'Parlons de vos besoins hydrauliques',
                'form_subtitle' => 'Douala : (+237) 674 048 225 • Yaoundé : (+237) 696 781 077 • Service disponible 7j/7 pour vos urgences.',
                'call_label' => 'Téléphones',
                'call_value' => '(+237) 674 048 225 / (+237) 696 781 077',
                'email_label' => 'Adresses e-mail',
                'email_value' => 'contact@camerounhydraulique.com • cameroun.hydraulique@yahoo.fr',
                'location_label' => 'Agences Cameroun Hydraulique',
                'location_value' => 'Douala : entre Texaco Nkolouloun et Carrefour Photo Golden (face Boulangerie de luxe) • Douala Yassa : entrée salle de fête BOCOM • Yaoundé : en face Tradex Olembe • BP 9593 Douala Cameroun',
                'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1995.6073240853046!2d9.7067669!3d4.0615366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610dfc22ef6c2b%3A0xa8f0c7cdeaec1c30!2sTexaco%20Nkolouloun!5e0!3m2!1sfr!2scm!4v1739126400000!5m2!1sfr!2scm',
                'banner_image' => '/img/breadcrumb.jpg',
                'video_image' => '/img/video.png',
            ],
        );
    }
}
