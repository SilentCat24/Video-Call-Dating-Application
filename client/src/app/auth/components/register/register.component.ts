import { Component,Inject,Injectable,OnInit, setTestabilityGetter } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { login } from 'src/models/user.model';
import { HttpClient } from '@angular/common/http';

// FormsModule
// import { ApiService } from 'src/app/services/api.service';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
userForm:FormGroup;
// login:login[];
// post:[];
alert="Enter Your New Credentials";

constructor(private formBuilder:FormBuilder,private UserService:UserService,private http:HttpClient,private Router:Router){
  this.userForm=formBuilder.group({
    fullname:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,
    Validators.email]), 
    password:new FormControl('',[Validators.required,
      Validators.minLength(6)]), 
      image:new FormControl('',Validators.required),
    age:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    peerId:new FormControl('',Validators.required)
  });


}

  ngOnInit(): void {
    this.UserService.getAllData().subscribe((res)=>{
      console.log(res)
   
    })


  }

onSubmit():any{
  
 if(this.userForm.valid){
  this.UserService.addUser(this.userForm.value).subscribe((res)=>{
    this.alert=res.msg
    

    setTimeout(()=>{
      this.Router.navigate(['login'])
    },2000)
    console.log(res);
  },(err)=>{
    console.log(err)
  }
  
  )

  }else{
   this.alert="Invalid credentials"
  }


  setTimeout(()=>{
    this.alert="Enter Your Credentials";
  },2000)
}




    // console.log(this.userForm.value)
  
}

