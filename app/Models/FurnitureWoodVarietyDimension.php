<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FurnitureWoodVarietyDimension extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function variety()
    {
        return $this->belongsTo(FurnitureWoodVariety::class);
    }
}
