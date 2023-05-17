import { Component,OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { signUp } from 'src/models/user.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
users:any;
condition=false;

constructor(private UserService:UserService,private Router:Router){}

  ngOnInit():void {
    // console.log(localStorage)
    this.UserService.getAllData().subscribe((res)=>{
      // this.users=res.data
      this.users=res;
      console.log(localStorage)
      if(localStorage.length==1){
        this.condition=true;
      }     
    })
    }



    logout(){
      localStorage.clear();
      this.Router.navigate(['login'])
      this.condition=false;

    }

}
