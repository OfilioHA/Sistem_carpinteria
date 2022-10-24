<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkerContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $workers = \App\Models\Worker::all();

        foreach ($workers as $worker) {
            $amount = rand(1,2);
            $contracts = \App\Models\WorkerContract::factory($amount)
                ->make();

            foreach ($contracts as $contract) {
                $job = \App\Models\Job::inRandomOrder()->first();
                $contract->job()->associate($job);
            }
            
            $worker->contracts()->saveMany($contracts);
        }
    }
}
