<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DimensionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dimensions = ['Longitud', 'Ancho', 'Espesor' ];

        foreach ($dimensions as $dimension) {
            \App\Models\Dimension::create([
                'name' => $dimension
            ]);
        }
    }
}
