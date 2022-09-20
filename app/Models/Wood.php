<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wood extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'wood_species_id'
    ];

    public function varieties(){
        return $this->hasMany(WoodVariety::class);
    }
}
