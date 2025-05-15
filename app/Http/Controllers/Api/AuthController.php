<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    //Register
    public function Register(Request $request){
        //validation de donnée
        $validation = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:4',
        ]);

        if(!$validation){
            return response()->json([
                'succes' => false,
                'status' => 500,
                'massage' => 'Verifier les information entrer'
            ], 401);
        }
    //si employee exist deja
        $existingUser = User::where('email', $validation['email'])->first();

        if($existingUser){
            return response()->json([
                'succes' => false,
                'status' => 500,
                'massage' => 'Utilisateur exist deja'
            ], 401);
        }

    //creation User
        $user = User::create([
            'name' => $validation['name'],
            'email' => $validation['email'],
            'password' => bcrypt($validation['password'])
        ]);

        //creation du token
        // $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'succes' => true,
            'status' => 200,
            'massage' => 'Utilisateur créer avec success',
        ], 200);
    }

    public function Login(Request $request){
        //validation de donnée
        $validation = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:4'
        ]);
        $user = User::where('email', $request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                'succes' => false,
                'status' => 401,
                'massage' => 'Verifier l\'email ou le mot de passe'
            ], 401);
        }

        //creation du token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'succes' => true,
            'token' => $token,
            'user' => $user,
            'message' => 'Utilisateur connecter avec success'
        ], 200);
    }

    public function Logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'status' => 200,
            'succes' => true,
            'message' => 'Utilisateur deconnecter avec success'
        ], 200);
    }
}
