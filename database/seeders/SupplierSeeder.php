<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $suppliers = \App\Models\Supplier::factory(15)->make();

        foreach ($suppliers as $supplier) {
            $city = \App\Models\City::inRandomOrder()->first();
            $supplier->city()->associate($city);
            $supplier->save();
        }
    }
}
