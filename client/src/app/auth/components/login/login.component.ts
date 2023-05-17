import { HttpClient } from '@angular/common/http';
import { Component,Inject,Injectable,OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { signUp } from 'src/models/user.model';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm:FormGroup;
  alert='Please login';
  user:[{}];
  statusCode:number=0;

  constructor(private formBuilder:FormBuilder,private Router:Router, private UserService:UserService,private http:HttpClient){
    this.userForm=formBuilder.group({
   email:new FormControl('',[Validators.required]),
   password:new FormControl('',[Validators.required])
   
  
    });
  }
ngOnInit():void {
this.UserService.getAllData().subscribe((res)=>{
  console.log(res)
})
}

onSubmit() {
  if(this.userForm.valid){
 this.UserService.loginUser(this.userForm.value).subscribe((res)=>{

  this.alert=res.msg;

  if(res.statusCode==1){
const jsonString=JSON.stringify(res.data);
localStorage.setItem('data',jsonString)
    
  setTimeout(()=>{
    this.Router.navigate(['profile'])

  },3000)

  }else{
    this.alert=res.msg;
  }
  // localStorage.setItem('data',jsonString)

  console.log(localStorage)


 },(err)=>{
  console.log(err)
 }
 )
}else{
  this.alert="Invalid user"
}



setTimeout(()=>{
  this.alert="Please Login";
},4000)
}


}