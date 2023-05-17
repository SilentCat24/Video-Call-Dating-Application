import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ChatsComponent } from './chat/chats/chats.component';
import { VideoComponent } from './video-call/video/video.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [

{path:'register',component:RegisterComponent},
{path:'login',component:LoginComponent},
{path:'profile/chat',component:ChatsComponent},
{path:'profile/video',component:VideoComponent},
{path:'profile',component:ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
