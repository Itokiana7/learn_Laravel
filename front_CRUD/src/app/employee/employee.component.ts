import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Employee } from '../interfaces/employee';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit,OnDestroy {
 employee : Employee[] = [];
_dataService = inject(DataService);
private subscription! : Subscription; 
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

ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe(); 
  }
  }
}
