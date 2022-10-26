<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genders = [
            [
                'name' => 'Masculino',
                'abbreviation' => 'M'
            ],
            [
                'name' => 'Femenino',
                'abbreviation' => 'F'
            ],
            [
                'name' => 'No Binario',
                'abbreviation' => 'NB'
            ]
        ];
        
        collect($genders)->each(function ($gender) {
            \App\Models\Gender::create($gender);
        });
    }
}
