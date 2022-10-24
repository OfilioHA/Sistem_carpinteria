<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $states = \App\Models\State::all();

        foreach ($states as $state) {
            $states = \App\Models\City::factory(8)->make();
            $state->cities()->saveMany($states);
        }
    }
}
