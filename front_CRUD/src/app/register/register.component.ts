import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  registerInput! : FormGroup;
  _serviceRegister = inject(DataService);
  private subscription! :Subscription 

  constructor(private fb : NonNullableFormBuilder){
    this.registerInput = this.fb.group({
      name : ['',[Validators.required,Validators.maxLength(50)]],
      email : ['',[Validators.required,Validators.email,Validators.maxLength(50)]],
      password : ['',[Validators.required,Validators.minLength(4)]],
    });
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  onRegister(){
    this.subscription = this._serviceRegister.register(this.registerInput.value).subscribe(
      (data) => {
        console.log("registration OK");
        this.registerInput.reset();
      },
      (error) => {
        console.log("error lors de la registration ", error);
      }
    )
  }
}
