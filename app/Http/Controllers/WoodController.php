<?php

namespace App\Http\Controllers;

use App\Models\Measure;
use App\Models\Wood;
use App\Models\WoodSpecies;
use App\Models\WoodTypeCut;
use App\Models\WoodVariety;
use Illuminate\Support\Facades\DB;
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
     * Return all Woods Type Cuts
     */
    public function typeCuts()
    {
        return response()->json([
            'data' => WoodTypeCut::all()
        ]);
    }
    

    /**
     * Return all Woods posible Measures
     */
    public function measures()
    {
        return response()->json([
            'data' => Measure::where([
                ['measure_type_id', 1],
                ['value', '<', 100]
            ])->get()
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

        try {
            DB::beginTransaction();
            $wood = new Wood([
                'name' => $validated['name'],
                'wood_species_id' => $validated['wood_species_id']
            ]);
    
            $wood->save();
            foreach ($validated['varieties'] as $variety) {
                $dimensions = array_merge(...$variety['dimensions']);
                unset($variety['dimensions']);
                $variety = new WoodVariety($variety);
                $variety->wood()->associate($wood);
                $variety->save();
                $variety->woodVarietyDimensions()->createMany($dimensions);
            }
            DB::commit();
            return response()->json(['status' => 'ok']);
        } catch (\Throwable $e) {
            DB::rollBack();
            dd($e->getMessage());
        }
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
            ])->with(['varieties'])
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
        $wood->varieties()->createMany($validated['varieties']);

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
