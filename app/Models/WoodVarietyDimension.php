<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WoodVarietyDimension extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'measure_id',
        'dimension_id',
        'value'
    ];

    public function measure()
    {
        return $this->belongsTo(Measure::class);
    }

    public function dimension()
    {
        return $this->belongsTo(Dimension::class);
    }

    public function woodVariety()
    {
        return $this->belongsTo(woodVariety::class);
    }

}
