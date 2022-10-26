<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FurnitureWoodVariety extends Model
{
    use HasFactory;

    public $timestamps = false;


    public function woodVariety()
    {
        return $this->belongsTo(WoodVariety::class);
    }

    public function furniture()
    {
        return $this->belongsTo(Furniture::class);
    }
}
