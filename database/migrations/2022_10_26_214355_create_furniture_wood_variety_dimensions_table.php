<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('furniture_wood_variety_dimensions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('measure_id')->constrained();
            $table->foreignId('dimension_id')->constrained();
            $table->foreignId('variety_id')->constrained('furniture_wood_varieties');
            $table->float('value');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('furniture_wood_variety_dimensions');
    }
};
