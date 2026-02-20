<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('footer_settings', function (Blueprint $table) {
            $table->id();
            $table->string('contact_phone')->nullable();
            $table->string('contact_whatsapp')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_address')->nullable();
            $table->text('footer_description')->nullable();
            $table->json('quick_links')->nullable();
            $table->json('services')->nullable();
            $table->json('recent_posts')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('copyright_text')->nullable();
            $table->timestamps();
        });

        DB::table('footer_settings')->insert([
            'contact_phone' => '(+237) 693 93 38 03',
            'contact_whatsapp' => '(+237) 674 04 82 25',
            'contact_email' => 'camerounhydraulique@yahoo.com',
            'contact_address' => 'Texaco Nkololoun — Yassa face afriland',
            'footer_description' => 'Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a lacinia curabitur lacinia mollis',
            'quick_links' => json_encode([
                ['text' => 'Solar About', 'link' => '/about'],
                ['text' => 'Our Services', 'link' => '/service'],
                ['text' => 'Our Blogs', 'link' => '/news'],
                ['text' => "FAQ'S", 'link' => '/faq'],
                ['text' => 'Contact Us', 'link' => '/contact'],
            ]),
            'services' => json_encode([
                ['text' => 'Consultancy', 'link' => '/service-details'],
                ['text' => 'Solar System', 'link' => '/service-details'],
                ['text' => 'Solar Panel', 'link' => '/service-details'],
                ['text' => 'Style Guide', 'link' => '/service-details'],
                ['text' => 'License', 'link' => '/service-details'],
            ]),
            'recent_posts' => json_encode([
                [
                    'image' => '/img/news/pp1.jpg',
                    'date' => '20 Feb, 2025',
                    'title' => '2021 Batterman Award honors Brad Burkhart',
                    'link' => '/news-details',
                ],
                [
                    'image' => '/img/news/pp2.jpg',
                    'date' => '15 Dec, 2025',
                    'title' => '2021 Batterman Award honors Brad Burkhart',
                    'link' => '/news-details',
                ],
            ]),
            'facebook_url' => '#',
            'twitter_url' => '#',
            'linkedin_url' => '#',
            'youtube_url' => '#',
            'copyright_text' => '© 2025 Hydraulique Cameroun SARL',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('footer_settings');
    }
};
