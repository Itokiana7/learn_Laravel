import { Employee } from './../interfaces/employee';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnChanges {
  updateForm! : FormGroup;
  @Input() show: boolean = false;
  @Input() employee !: any;
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();
  _dataService = inject(DataService);

  constructor(private fb : NonNullableFormBuilder){
  
  }

ngOnChanges(changes: SimpleChanges): void {
  if (changes['employee'] && this.employee) {
    this.updateForm = this.fb.group({
      name: [this.employee.name],
      age: [this.employee.age],
      salary: [this.employee.salary]
    });
  }
}

  closePopup() {
    this.close.emit();
  }

  updatePopup(){
    if(this.updateForm.valid){
      const updated = { ...this.employee, ...this.updateForm.value };
  this._dataService.updateEmployer(updated,this.employee.id).subscribe(
    (data) =>{
      this.update.emit(data);
    },
    (error) =>{
      console.log("Erreur lors du mise a jour" , error);
    }
    );
    }
    
  }
}
