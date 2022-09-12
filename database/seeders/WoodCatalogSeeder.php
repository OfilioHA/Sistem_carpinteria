<?php

namespace Database\Seeders;

use App\Models\WoodCatalog;
use App\Models\WoodSpecies;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WoodCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $woods = [
            ["Pino Silvestre", "Pino Oregón", "Abeto"],
            ["Roble" ,"Castaño", "Eucalipto", "Cedro", "Haya", "Nogal"],
            ["Iroko", "Bolondo", "Ipé", "Teka"]
        ];

        foreach(WoodSpecies::all() as $key => $specie){
            foreach($woods[$key] as $wood){
                $specie->catalog()->save(
                    new WoodCatalog([
                        'name' => $wood
                    ])
                );
            }
        }

    }
}
