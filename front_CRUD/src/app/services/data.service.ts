import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';
import { Register } from '../interfaces/register';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 httpClient = inject(HttpClient);
  constructor() { }

  isAthentificated () : boolean{
    return !!sessionStorage.getItem('token');
  }

  public getEmployer() : Observable<Employee[]>{
    return this.httpClient.get<Employee[]>('http://127.0.0.1:8000/api/employee/getAll');
  }

  public addEmployer(employee : Employee) : Observable<Employee[]>{
    return this.httpClient.post<Employee[]>('http://127.0.0.1:8000/api/employee/addEmployee', employee);
  }
  

  public delEmployer(id : number) : Observable<any>{
    return this.httpClient.delete(`http://127.0.0.1:8000/api/employee/deleteEmployee/${id}`);
  }

  public getOneEmployer(id : number) : Observable<any>{
    return this.httpClient.get<any>(`http://127.0.0.1:8000/api/employee/getOneEmployee/${id}`);
  }

  public updateEmployer(employee : Employee, id : number) : Observable<Employee>{
    return this.httpClient.patch<Employee>(`http://127.0.0.1:8000/api/employee/updateEmployee/${id}`, employee);
  }

  //register
  public register(user : Register) : Observable<any>{
    return this.httpClient.post(`http://127.0.0.1:8000/api/register`, user);
  }

  public login(user : Login) :Observable<any>{
    return this.httpClient.post(`http://127.0.0.1:8000/api/login`, user);
  }

  public logout() :Observable<any>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(`http://127.0.0.1:8000/api/logout`,{} , {headers});
  }
}
