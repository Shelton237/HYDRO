<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the seeder.
     */
    public function run(): void
    {
        $adminEmail = env('ADMIN_EMAIL', 'admin@hydraulique-cameroun.cm');
        $adminPassword = env('ADMIN_PASSWORD', 'HydroAdmin123!');

        User::updateOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'Hydraulique Admin',
                'email_verified_at' => now(),
                'password' => Hash::make($adminPassword),
                'remember_token' => null,
            ],
        );
    }
}
