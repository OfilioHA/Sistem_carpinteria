<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FurnitureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = \App\Models\FurnitureCategory::all();

        foreach ($categories as $category) {
            $amount = rand(2, 5);
            $furnitures = \App\Models\Furniture::factory($amount)->make();
            $category->furnitures()->saveMany($furnitures);
        }
    }
}
