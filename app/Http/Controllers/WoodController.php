<?php

namespace App\Http\Controllers;

use App\Models\Wood;
use App\Models\WoodSpecies;
use App\Models\WoodVariety;
use Illuminate\Http\Request;

class WoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'data' => Wood::withCount('varieties')->get()
        ]);
    }

    /** 
     * Return all Wood Species
     */
    public function species()
    {
        return response()->json([
            'data' => WoodSpecies::all()
        ]);
    }

    /** 
     * Return all Wood in Catalog
     */
    public function catalog()
    {
        return response()->json([
            'data' => WoodSpecies::with('catalog')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'wood_species_id' => ['required', 'numeric'],
            'varieties' => ["required", "array", "min:1"]
        ]);

        $wood = new Wood([
            'name' => $validated['name'],
            'wood_species_id' => $validated['wood_species_id']
        ]);

        $wood->save();

        $varieties = [];
        foreach ($validated['varieties'] as $variety) {
            $varieties[] = new WoodVariety($variety);
        }
        $wood->varieties()->saveMany($varieties);
        return response()->json(['status' => 'ok']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Wood  $wood
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        return response()->json([
            'data' => Wood::select([
                'id',
                'name', 
                'wood_species_id'
                ])
                ->with(['varieties'])
                ->find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Wood  $wood
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Wood $wood)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'wood_species_id' => ['required', 'numeric'],
            'varieties' => ["required", "array", "min:1"]
        ]);

        $wood->update([
            'name' => $validated['name'],
            'wood_species_id' => $validated['wood_species_id']
        ]);

        $wood->varieties()->delete();
        $varieties = [];
        foreach ($validated['varieties'] as $variety) {
            $varieties[] = new WoodVariety($variety);
        }
        $wood->varieties()->saveMany($varieties);
        return response()->json(['status' => 'ok']);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Wood  $wood
     * @return \Illuminate\Http\Response
     */
    public function destroy(Wood $wood)
    {
        $wood->varieties()->delete();
        $wood->delete();

        return response()->json([
            'status' => 'ok'
        ]);
    }
}
