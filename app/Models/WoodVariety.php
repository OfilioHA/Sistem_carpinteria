<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WoodVariety extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'wood_type_cut_id',
    ];

    public function wood() :BelongsTo
    {
        return $this->belongsTo(Wood::class);
    }

    public function woodTypeCut() :BelongsTo
    {
        return $this->belongsTo(WoodTypeCut::class);
    }

    public function woodVarietyDimensions() : HasMany
    {
        return $this->hasMany(WoodVarietyDimension::class);
    }

    public function dimensions() : BelongsToMany
    {
        return $this->belongsToMany(Dimension::class);
    }
}
