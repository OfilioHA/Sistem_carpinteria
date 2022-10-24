<?php

namespace Database\Seeders;

use App\Models\WoodTypeCut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WoodTypeCutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            'Tabla',
            'Alfajias',
            'Cuartones',
            'Reglas'
        ];

        foreach ($types as $type) {
            (new WoodTypeCut([
                'name' => $type
            ]))->save();
        }
    }
}
