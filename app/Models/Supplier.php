<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'direction',
        'city_id',
        'email',
        'description',
        'rating'
    ];

    public function city() : BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function phone() : MorphOne
    {
        return $this->morphOne(
            CellPhone::class,
            'model'
        );
    }
}
