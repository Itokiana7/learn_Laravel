import { EditComponent } from './edit/edit.component';
import { EmployeeComponent } from './employee/employee.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoComponent } from './info/info.component';
import { ServicesComponent } from './services/services.component';

export const routes: Routes = [
    
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children:[
            {path:'dashboard', redirectTo:'dashboard/Info', pathMatch:'full'},
            {path:'Info', component: InfoComponent},
            {path:'Employee', component: EmployeeComponent},
            {path:'Services', component: ServicesComponent}
        ]
    },
    {
        path:'',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
