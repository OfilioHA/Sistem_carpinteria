<?php

namespace App\Http\Controllers;

use App\Models\Worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WorkerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'data' => Worker::all()->map(function ($item) {
                
                $firstname = $item['person']['firstname'];
                $lastname  = $item['person']['lastname'];
                
                return [
                    'fullname' => "$firstname $lastname",
                    'code' => $item['code'],
                    'identification' => $item['identification'],
                ];
            })
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
            'person.firstname' => [ 'required' ],
            'person.lastname' => [ 'required' ],
            'gender_id' => [ 'required' ],
            //'city_id' => [ 'required' ],
            'code' => [ 'required', 'min:8' ],
            'identification' => [ 'required', 'min:13' ],
            'email' => [ 'required', 'email' ],
            'direction' => [ 'required' ],
            'birthday' => [ "required", 'date' ],
            'contracts' => ["required", "array", "min:1"]
        ]);

        try {
            DB::beginTransaction();
            $contracts = $validated['contracts'];
            $person = $validated['person'];
            $validated['city_id'] = 1;

            unset($validated['contracts']);
            unset($validated['person']);

            $worker = Worker::create($validated);
            $worker->person()->create($person);
            $worker->contracts()->createMany($contracts);
            
            DB::commit();

            return response()->json([
                'status' => 'ok'
            ]);

        } catch (\Exception $ex) {
            DB::rollBack();
            dd($ex->getMessage());
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
    public function destroy($id)
    {
        //
    }
}
