<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FurnitureCategory extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function furnitures()
    {
        return $this->hasMany(Furniture::class);
    }
}
