import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Peer } from 'peerjs';
import { Profiles } from 'src/models/user.model';



@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit  {
  private peer:Peer;
  peerIdShare:string;
  peerId:string;
  private lazyStream:any;
  currentPeer:any;
  private peerList:Array<any>=[];
  display:boolean;
  number:"12345";

  constructor(private Router:Router){
    // const data:any=localStorage.getItem('data');
    // const objects=JSON.parse(data);
    // objects.forEach((object:any)=>{
    //   console.log(object.age)
    // })
   
  // const user:any=localStorage.getItem('data')
     this.peer=new Peer();
  
  
  }

  ngOnInit(): void {
    // console.log(localStorage)
    
//  if(localStorage.length===0){
//   this.display=false
//  }else{
//   this.display=true
//  }
    this.getPeerId();
  }

  private getPeerId = () => {
    //Generate unique Peer Id for establishing connection
        this.peer.on('open', (id) => {
          this.peerId = id;
          // this.createURLToConnect(id);
        });
        this.peer.on('call', (call) => {
          navigator.mediaDevices.getUserMedia({
            video: true, 
            audio: true
          }).then((stream) => {
            this.lazyStream = stream;
    
            call.answer(stream);
            call.on('stream', (remoteStream) => {
              if (!this.peerList.includes(call.peer)) {
                this.streamRemoteVideo(remoteStream);
                this.currentPeer = call.peerConnection;
                this.peerList.push(call.peer);
              }
            });
    
          }).catch(err => {
            console.log(err + 'Unable to get media');
          });
        });
      }

      connectWithPeer():void{
        this.callPeer(this.peerIdShare)
      }

      private callPeer(id: string): void {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).then((stream) => {
          this.lazyStream = stream;
    
          const call = this.peer.call(id, stream);
          call.on('stream', (remoteStream) => {
            if (!this.peerList.includes(call.peer)) {
              this.streamRemoteVideo(remoteStream);
              this.currentPeer = call.peerConnection;
              this.peerList.push(call.peer);
            }
          });
        }).catch(err => {
          console.log(err + 'Unable to connect');
        });
      }

      private streamRemoteVideo(stream:any) {
        const video = document.createElement('video');
        video.classList.add('video');
        video.srcObject = stream;
        video.play();
    
        document.getElementById('remote-video')?.append(video);
      }


  logOut(){
    localStorage.clear();
  this.Router.navigate(['login'])
  }

}
