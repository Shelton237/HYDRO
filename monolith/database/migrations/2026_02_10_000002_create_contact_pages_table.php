<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('contact_pages', function (Blueprint $table) {
            $table->id();
            $table->string('form_title')->default("We'd Love to Hear From!");
            $table->text('form_subtitle')->nullable();
            $table->string('call_label')->default('Call Us 7/24');
            $table->string('call_value')->default('+208-555-0112');
            $table->string('email_label')->default('Make a Quote');
            $table->string('email_value')->default('Solar@gmail.com');
            $table->string('location_label')->default('Location');
            $table->string('location_value')->default('4517 Washington ave.');
            $table->text('map_embed_url')->nullable();
            $table->timestamps();
        });

        DB::table('contact_pages')->insert([
            'form_title' => "We'd Love to Hear From!",
            'form_subtitle' => 'Nullam varius, erat quis iaculis dictum, eros urna varius eros, ut blandit felis odio in turpis. Quisque rhoncus, eros in auctor ultrices,',
            'call_label' => 'Call Us 7/24',
            'call_value' => '+208-555-0112',
            'email_label' => 'Make a Quote',
            'email_value' => 'Solar@gmail.com',
            'location_label' => 'Location',
            'location_value' => '4517 Washington ave.',
            'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_pages');
    }
};
