<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $jobTypes = \App\Models\JobType::all();

        foreach ($jobTypes as $jobtype) {
            $job = \App\Models\Job::factory(3)->make();
            $jobtype->jobs()->saveMany($job);
        }
        
    }
}
