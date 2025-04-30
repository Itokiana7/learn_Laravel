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
                'success' => true,
                'status' => 200,
                'message' => 'Employé créé avec succès.',
                'data' => $employee
            ],200);

    }

    public function deleteEmployee(Request $request){
        //récupérer ID employee
        $id = $request->id;
        $employee = Employee::where('id', $id)->first();
        
        //vérification si employer exist
        if(!$employee){
            return response()->json([
                'success' => false,
                'status' => 404,
                'message' => 'Cette Employé n\'exist pas.',
            ]);    
        }

        //suppression Employer
        $employee->delete();
        return response()->json([
            'sucess' => true,
            'status' => 200,
            'message' => 'Employé supprimé avec succès.',
        ]);
    }

    public function updateEmployee(Request $request, $id){
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'success' => false,
                'status' => 404,
                'message' => 'Employé introuvable.'
            ], 404);
        }

         // Validation des champs
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'age' => 'required|integer', // Ignore l'employé actuel
        'salary' => 'required|integer'
    ]);

     // Mise à jour des données
     $employee->update($validated);

     return response()->json([
         'success' => true,
         'status' => 200,
         'message' => 'Employé mis à jour avec succès.',
         'data' => $employee
     ]);
    }

    public function getOneEmployee(Request $request){
        $id = $request->id;
        $employee = Employee::where('id', $id)->first();
        if(!$employee){
            return response()->json([
                "success" => false,
                "status" => 404,
                "message" => "Employé introuvable"
            ]);
        }
        return response()->json($employee);
    }
}
