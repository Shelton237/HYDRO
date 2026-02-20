<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (! Schema::hasTable('services')) {
            return;
        }

        $connection = Schema::getConnection()->getDriverName();

        if (in_array($connection, ['mysql', 'mariadb'])) {
            DB::statement('ALTER TABLE services MODIFY COLUMN icon_path TEXT NULL');
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('services')) {
            return;
        }

        $connection = Schema::getConnection()->getDriverName();

        if (in_array($connection, ['mysql', 'mariadb'])) {
            DB::statement('ALTER TABLE services MODIFY COLUMN icon_path VARCHAR(255) NULL');
        }
    }
};
