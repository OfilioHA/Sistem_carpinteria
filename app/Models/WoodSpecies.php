<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WoodSpecies extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function catalog(){
        return $this->hasMany(WoodCatalog::class);
    }
}
