<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Wood extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'wood_species_id'
    ];

    public function varieties() : HasMany
    {
        return $this->hasMany(WoodVariety::class);
    }

    public function woodVarietyDimensions(): BelongsToMany
    {
        return $this->belongsToMany(WoodVarietyDimension::class);
    }
}
