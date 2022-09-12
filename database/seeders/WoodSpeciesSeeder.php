<?php

namespace Database\Seeders;

use App\Models\WoodSpecies;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WoodSpeciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $species = [
            'Coníferas / resinosas / Blandas',
            'Frondosas / Latifolias / Duras',
            'Tropicales'
        ];

        foreach($species as $specie){
            (new WoodSpecies([
                'name' => $specie
            ]))->save();
        }
    }
}
