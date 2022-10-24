<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MeasureTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $measureTypes = [
            'Longitud',
            'Liquida'
        ];

        foreach ($measureTypes as $measureType) {
            (new \App\Models\MeasureType([
                'name' => $measureType
            ]))->save();
        }
    }
}
