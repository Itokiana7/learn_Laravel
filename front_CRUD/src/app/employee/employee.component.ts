import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Employee } from '../interfaces/employee';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit,OnDestroy {
  invalid : boolean = false;  
  employeeInsert! : FormGroup;
  employee : Employee[] = [];
_dataService = inject(DataService);

private subscription! : Subscription; 

constructor(public fb : NonNullableFormBuilder){
  this.employeeInsert = this.fb.group({
      name : ['',[Validators.required,Validators.maxLength(50)]],
      age : ['',[Validators.required,Validators.maxLength(5)]],
      salary : ['',[Validators.required,Validators.maxLength(10)]],
  })
}



ngOnInit(): void {
   this.getEmployee();
 }

 public getEmployee(){
  this.subscription = this._dataService.getEmployer().subscribe(
    (data) =>{
      this.employee = data;
      console.log(this.employee);
    },

    (error) => {
      console.log("Erreur lors de la requette");

    }
  )
 }

 public insertEmployee(){
  if(this.employeeInsert.value == ""){
        this.invalid = true;
  }
  this.invalid = false;
  this.subscription = this._dataService.addEmployer(this.employeeInsert.value).subscribe(
    (data) => {
      this.getEmployee();
      this.employeeInsert.reset();
    },
    (error) => {
      this.invalid = true;
      console.log("erreur lors de l'Ajoute");
    });
  }
  
  deleteEmployee(id : number){
    this.subscription = this._dataService.delEmployer(id).subscribe(
      (data) => {
          this.getEmployee();
          console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
    
  }

ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe(); 
  }
  }
}
