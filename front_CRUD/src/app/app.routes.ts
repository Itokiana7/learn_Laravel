import { EditComponent } from './edit/edit.component';
import { EmployeeComponent } from './employee/employee.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'crudEmployee',
        component:EmployeeComponent,
        canActivate: [authGuard]
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
