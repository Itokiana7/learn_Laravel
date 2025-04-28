<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function getEmployee(){
       $Allemployee = Employee::all();
       return response()->json($Allemployee);
    }

    public function addEmployee(Request $request){
        //validation
        $validatedData = $request->validate([
            'name' => 'required|string|max:191',
            'age' => 'required|integer',
            'salary' => 'required|integer',
        ]);

        //tester si un des champ vide
        if(!$validatedData){
            return response()->json([
                'sucess' => false,
                'status' => 500,
                'message' => 'Vérifier les données entrer',
            ], 500);
        }

        //tester si employer exist deja
        $existingEmployee = Employee::where('name', $validatedData['name'])->first();
        if($existingEmployee){
            return response()->json([
                'sucess' => false,
                'status' => 500,
                'message' => 'Employé exist deja',
            ], 500);
        }

        //creation de l'employer
        $employee = Employee::create($validatedData);
            return response()->json([
                'sucess' => true,
                'status' => 200,
                'message' => 'Employé créé avec succès.',
                'data' => $employee
            ],200);

    }
}
