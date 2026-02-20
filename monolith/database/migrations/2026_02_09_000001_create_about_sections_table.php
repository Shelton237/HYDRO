<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('about_sections', function (Blueprint $table) {
            $table->id();
            $table->string('subtitle')->default('About Us');
            $table->string('title');
            $table->string('highlight')->nullable();
            $table->text('description')->nullable();
            $table->string('background_image')->nullable();
            $table->string('button_label')->nullable();
            $table->string('button_url')->nullable();
            $table->string('icon_one_title')->nullable();
            $table->text('icon_one_description')->nullable();
            $table->string('icon_two_title')->nullable();
            $table->text('icon_two_description')->nullable();
            $table->string('author_name')->nullable();
            $table->string('author_title')->nullable();
            $table->string('author_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_sections');
    }
};
