import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  
  loginInput! : FormGroup;
  _serviceLogin = inject(DataService);
  _router = inject(Router)
  private subscription !: Subscription;

  constructor(private fb : NonNullableFormBuilder){
    this.loginInput = this.fb.group({
      email : ['',[Validators.required,Validators.email,Validators.maxLength(50)]],
      password : ['',[Validators.required,Validators.minLength(4)]],
    });
  }
  

  onLogin(){
    this.subscription = this._serviceLogin.login(this.loginInput.value).subscribe({
      next : (response) =>{
        console.log(this.loginInput.value);
        console.log('Login réussi', response);
        sessionStorage.setItem('token',response.token);
        this._router.navigate(['/crudEmployee']);
        this.loginInput.reset();
      },
      error : (error) =>{
        console.error('Erreur de login', error);
      }
    }
      
    )
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
