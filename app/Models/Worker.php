<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Worker extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $with = ['person'];
    protected $guarded = [];

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function contracts(): HasMany
    {
        return $this->hasMany(WorkerContract::class);
    }

    public function person(): MorphOne
    {
        return $this->morphOne(
            Person::class,
            'person'
        );
    }

    public function gender(): BelongsTo
    {
        return $this->belongsTo(Gender::class);
    }
}
