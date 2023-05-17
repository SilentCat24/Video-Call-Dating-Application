import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {login,signUp} from '../models/user.model';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

// rootURL="http://localhost:7000/user"
  constructor(private http:HttpClient) { }

// getUsers(){
// return this.http.get(this.rootURL+'/all');
// }

// Register(signUp:any){
//   return this.http.post(this.rootURL+'/register',JSON.stringify(signUp))
 
// }

// login(user:any){
//   return this.http.post(this.rootURL + '/login',{user});
// }



REST_API:string='http://localhost:7000/user';

// handle error
handleError(error:HttpErrorResponse){
  let errorMessage='';
  if(error.error instanceof ErrorEvent){
    errorMessage=error.error.message;
  }else{
    errorMessage=`Error Code:${error.status}\nMessage:${error.message}`
  }
console.log(errorMessage);
return throwError(errorMessage)
}

getAllData(){
  return this.http.get(`${this.REST_API}/all`)
}


addUser(data:signUp):Observable<any>{
  let API_URL=`${this.REST_API}/register`;
  return this.http.post(API_URL,data).pipe(catchError(this.handleError))
}

loginUser(data:login):Observable<any>{
  let API_URL=`${this.REST_API}/login`;
  return this.http.post(API_URL,data).pipe(catchError(this.handleError))
}



}
