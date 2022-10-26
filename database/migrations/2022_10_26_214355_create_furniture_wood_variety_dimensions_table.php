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
        /*
        SELECT
            wood.name,
            wtc.name,
            d.name,
            m.name,
            wvd.value
        FROM wood
        INNER JOIN wood_varieties wv on wood.id = wv.wood_id
        INNER JOIN wood_type_cuts wtc on wv.wood_type_cut_id = wtc.id
        INNER JOIN wood_variety_dimensions wvd on wv.id = wvd.wood_variety_id
        INNER JOIN dimensions d on wvd.dimension_id = d.id
        INNER JOIN measures m on wvd.measure_id = m.id
        ORDER BY wv.id
        */
        
        Schema::create('furniture_wood_variety_dimensions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('measure_id')->constrained();
            $table->foreignId('dimension_id')->constrained();
            $table->foreignId('wood_variety_id')->constrained('furniture_wood_varieties');
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
