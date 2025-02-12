<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FurnitureWoodVarietySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $furnitures = \App\Models\Furniture::all();

        foreach ($furnitures as $furniture) {
            $amount = rand(1, 3);

            for ($i=0; $i < $amount; $i++) {
                $furnitureVariety = \App\Models\FurnitureWoodVariety::factory(1)->make()->first();
                $woodVariety = \App\Models\WoodVariety::inRandomOrder()->first();
                $furnitureVariety->woodVariety()->associate($woodVariety);
                $furnitureVariety->furniture()->associate($furniture);
                $furnitureVariety->save();
            }
        }
    }
}
