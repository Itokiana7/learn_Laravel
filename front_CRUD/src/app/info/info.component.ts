import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  superieur = {
    nom : "Andriniaina Odon",
    age : 40,
    type : "chef de service"
  }

  stagiaire = ['Itokiana','Dani','Fanilo','Silvia'];
  AllSuperieur = [
    {nom : "Andry", age : 40, type : "chef de service"},
    {nom : "Mo", age : 41, type : "chef de service"},
    {nom : "Lalaina", age : 45, type : "chef de service"},
  ]
  
}
