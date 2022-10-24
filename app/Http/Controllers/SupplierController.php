<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'data' => Supplier::all()
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
            'direction' => ["required"],
            'city_id' => ['required', 'numeric'],
            'phone' => ['required', 'min:8'],
            'email' => ['required', 'email'],
            'rating' => ['required', 'numeric', 'between:1,5'],
            'description' => ['sometimes', 'nullable']
        ]);

        try {
            $phone['number'] = $validated['phone'];
            $phone['phone_brand_id'] = 1;
            unset($validated['phone']);

            DB::beginTransaction();
            $supplier = Supplier::create($validated);
            $supplier->phone()->create($phone);
            DB::commit();

            return response()->json([
                'status' => 'ok'
            ]);

        } catch (\Throwable $e) {
            DB::rollBack();
            dd($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return response()->json([
            'status' => 'ok'
        ]);
    }
}
