<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Furniture extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(FurnitureCategory::class);
    }

    public function varieties()
    {
        return $this->hasMany(FurnitureWoodVariety::class);
    }
}
