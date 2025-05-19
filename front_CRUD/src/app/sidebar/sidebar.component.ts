import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
email : string = "test@gmail.com";
_dataService = inject(DataService);
_router = inject(Router);
   logout(){
      //effacer token dans base de donnée
      this._dataService.logout().subscribe({
      next : (data) =>{
                //Supprimer token dans session storage
                  sessionStorage.removeItem('token');
                  
                  //naviger vers la page de login
                  this._router.navigate(['/login']);

        },
       error : (error) =>{
          console.log("Erreur lors du deconnexion");
        }
        }
       
        )
      

    }
}
