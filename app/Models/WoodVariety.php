<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WoodVariety extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = ['height', 'width'];

    public function wood(){
        return $this->belongsTo(Wood::class);
    }
}
