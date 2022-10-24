<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WoodVarietyDimensionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $woodVarities = \App\Models\WoodVariety::all();
        $measure = \App\Models\Measure::where('name', 'like', 'metro')->first();

        foreach ($woodVarities as $woodVarity) {
            $dimensions = \App\Models\Dimension::all();
            
            foreach ($dimensions as $dimension) {
                $varietyDimension = \App\Models\WoodVarietyDimension::factory(1)
                    ->make()->first();
                $varietyDimension->dimension()->associate($dimension);
                $varietyDimension->woodVariety()->associate($woodVarity);
                $varietyDimension->measure()->associate($measure);
                $varietyDimension->save();
            }
        }
    }
}
