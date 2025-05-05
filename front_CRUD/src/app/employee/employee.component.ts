import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Employee } from '../interfaces/employee';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit,OnDestroy {
  invalid : boolean = false;  
  employeeInsert! : FormGroup;
  employee : Employee[] = [];
  selectedEmployee ! :any;
_dataService = inject(DataService);
show : boolean = false;
id !: number;
name !: string;
age !: number;
salary !: number;

private subscription! : Subscription; 

constructor(public fb : NonNullableFormBuilder){
  this.employeeInsert = this.fb.group({
      name : ['',[Validators.required,Validators.maxLength(50)]],
      age : ['',[Validators.required,Validators.maxLength(5)]],
      salary : ['',[Validators.required,Validators.maxLength(10)]],
  })
}



ngOnInit(): void {
   this.getAllEmployee();
 }

 showPopup(){
  this.show = !this.show;
}

editEmployee(employee : any){
  this.selectedEmployee = {...employee};
  console.log(this.selectedEmployee);
  this.show = !this.show;
}

 getAllEmployee(){
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

 insertEmployee(){
  if(this.employeeInsert.value == ""){
        this.invalid = true;
  }
  this.invalid = false;
  this.subscription = this._dataService.addEmployer(this.employeeInsert.value).subscribe(
    (data) => {
      this.getAllEmployee();
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
          this.getAllEmployee();
          console.log(data);
      },
      (error) => {
        console.log(error);
      }
    ) 
  }

  updateEmployee(){
    setTimeout(()=>{
      this.show = !this.show;
    }, 1000);
    this.getAllEmployee();
    }

ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe(); 
  }
  }
}
