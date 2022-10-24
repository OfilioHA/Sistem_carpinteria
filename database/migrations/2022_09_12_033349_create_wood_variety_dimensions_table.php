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
        Schema::create('wood_variety_dimensions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('measure_id')->constrained();
            $table->foreignId('dimension_id')->constrained();
            $table->foreignId('wood_variety_id')->constrained();
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
        Schema::dropIfExists('wood_variety_dimensions');
    }
};
