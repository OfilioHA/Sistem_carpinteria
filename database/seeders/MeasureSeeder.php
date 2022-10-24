<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MeasureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $measures = [
            [
                'type' => 1,
                'values' => [
                    [
                        'name' => 'Hectómetro',
                        'abbreviation' => 'hmtrs',
                        'value' => 100
                    ],
                    [
                        'name' => 'Decámetro',
                        'abbreviation' => 'damtrs',
                        'value' => 10
                    ],
                    [
                        'name' => 'Metro',
                        'abbreviation' => 'mtrs',
                        'value' => 1
                    ],
                    [
                        'name' => 'Decímetro',
                        'abbreviation' => 'dmtrs',
                        'value' => -10
                    ],
                    [
                        'name' => 'Centímetro',
                        'abbreviation' => 'cmtrs',
                        'value' => -100
                    ],
                    [
                        'name' => 'Milímetro',
                        'abbreviation' => 'mmtrs',
                        'value' => -1000
                    ]
                ]
            ]
        ];

        foreach ($measures as $measure) {
            $type = \App\Models\MeasureType::find($measure['type']);
            $type->measures()->createMany($measure['values']);
        }
    }
}
