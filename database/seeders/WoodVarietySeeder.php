<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WoodVarietySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $woods = \App\Models\Wood::all();

        foreach ($woods as $wood) {
            $typeCutsAmount = \App\Models\WoodTypeCut::all()->count();
            $amount = rand(1, $typeCutsAmount);
            $cuts = range(1, $amount);

            $varieties = \App\Models\WoodVariety::factory($amount)
                ->make();

            foreach ($varieties as $key => &$variety) {
                $cut = \App\Models\WoodTypeCut::find($cuts[$key]);
                $variety->woodTypeCut()->associate($cut);
            }

            $wood->varieties()->saveMany($varieties);
        }
    }
}
