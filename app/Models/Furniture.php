<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Furniture extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(
            FurnitureCategory::class,
            'furniture_category_id'
        );
    }

    public function varieties()
    {
        return $this->hasMany(
            FurnitureWoodVariety::class,
            'furniture_id'
        );
    }
}
