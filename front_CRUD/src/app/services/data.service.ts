import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 httpClient = inject(HttpClient);
  constructor() { }

  public getEmployer() : Observable<Employee[]>{
    return this.httpClient.get<Employee[]>('http://127.0.0.1:8000/api/employee/getAll');
  }
}
