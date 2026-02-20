<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('contact_pages', function (Blueprint $table) {
            $table->string('banner_image')->nullable()->after('map_embed_url');
            $table->string('video_image')->nullable()->after('banner_image');
        });
    }

    public function down(): void
    {
        Schema::table('contact_pages', function (Blueprint $table) {
            $table->dropColumn(['banner_image', 'video_image']);
        });
    }
};