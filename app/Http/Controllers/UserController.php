<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'data' => User::all()->map(function($item){
                return [
                    'id' => $item['id'],
                    'name' => $item['name'],
                    'role_name' => $item['role']['name']
                ];
            })
        ]);
    }

    /** 
     *  Return all the user roles 
    */
    public function roles(){
        return response()->json([
            'data' => Role::all()
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
            'email' => ['required'],
            'role_id' => ['required', 'numeric'],
            'password' => ['required','confirmed','min:6']
        ]);

        (new User($validated))->save();
        
        return response()->json([
            'status' => 'ok'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json([
            'data' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'email' => ['required'],
            'role_id' => ['required', 'numeric'],
            'password' => 'required|confirmed|min:6'
        ]);

        $user->update($validated);

        return response()->json([
            'status' => 'Ok'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'status' => 'OK'
        ]);
    }
}
