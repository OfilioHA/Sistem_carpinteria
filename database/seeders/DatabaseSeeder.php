<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CountrySeeder::class,
            StateSeeder::class,
            CitySeeder::class,
            MeasureTypeSeeder::class,
            MeasureSeeder::class,
            JobTypeSeeder::class,
            JobSeeder::class,
            RoleSeeder::class,
            DimensionSeeder::class,
            PhoneBrandSeeder::class,
            WoodSpeciesSeeder::class,
            WoodCatalogSeeder::class,
            WoodSeeder::class,
            WoodTypeCutSeeder::class,
            WoodVarietySeeder::class,
            WoodVarietyDimensionSeeder::class,
            SupplierSeeder::class,
            WorkerSeeder::class,
            WorkerContractSeeder::class
        ]);

        \App\Models\User::factory(1)->create();

    }
}