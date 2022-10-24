<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $workers = \App\Models\Worker::factory(10)->make();

        foreach ($workers as $worker) {
            $person = \App\Models\Person::factory(1)->make()->first();
            $city = \App\Models\City::inRandomOrder()->first();
            $worker->city()->associate($city);
            $worker->save();
            $worker->person()->save($person);
        }

    }
}
