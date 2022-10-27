<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FurnitureWoodVarietyDimensionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $furnituresVarieties = \App\Models\FurnitureWoodVariety::all();

        foreach ($furnituresVarieties as $furnitureVariety) {
            $woodVariety = $furnitureVariety->woodVariety()->first();
            $dimensions = $woodVariety->woodVarietyDimensions()->get();
            foreach ($dimensions as $dimension) {
                $dimensionId = $dimension->dimension_id;
                $measureId = $dimension->measure_id;
                $value = $dimension->value;
                $newValue = rand(1, $value);
                \App\Models\FurnitureWoodVarietyDimension::create([
                    'value' => $newValue,
                    'measure_id' => $measureId,
                    'dimension_id' => $dimensionId,
                    'variety_id' => $furnitureVariety->id
                ]);
            }
        }

    }
}
