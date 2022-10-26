<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Gender;
use App\Models\State;
use App\Models\Job;
use App\Models\JobType;
use Illuminate\Http\Request;

class GeneralCatalogController extends Controller
{
    public function states()
    {
        return response()->json([
            'data' => State::where('country_id', 1)->get()
        ]);
    }

    public function cities(int $id)
    {
        return response()->json([
            'data' => City::where('state_id', $id)->get()
        ]);
    }

    public function jobs()
    {
        return response()->json([
            'data' => JobType::with('jobs')->get()
        ]);
    }

    public function genders()
    {
        return response()->json([
            'data' => Gender::all()
        ]);
    }
}
