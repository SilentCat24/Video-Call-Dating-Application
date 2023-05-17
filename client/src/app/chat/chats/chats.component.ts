import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import Peer from 'peerjs';



@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent  implements OnInit {
  private peer:Peer;
  peerIdShare:string;
  peerId:string;
  private lazyStream:any;
  currentPeer:any;
  private peerList:Array<any>=[];
message:string;
peerjsConnection:any;

  constructor(){
    this.peerjsConnection=new Peer();
    this.peer=new Peer();
  }

  ngOnInit(): void {
    console.log(localStorage)
    this.getPeerId();
  }

  private getPeerId=()=>{
    this.peer.on('open',(id)=>{
      this.peerId=id;
    })
    

    this.peer.on('connection',function(peerjsConnection){
      peerjsConnection.on('open',function(){
        // var inputBoxes=(document.getElementById('inputBox')as HTMLElement);
        // const inputBoxes=(document.getElementById('inputBox')).value

        // inputBoxes.addEventListener('change',function(){
        //   var message=inputBoxes.value;
        //   peerjsConnection.send(message)
        // });
      //  console.log(inputBoxes.value)
        peerjsConnection.on('data',function(message){
          console.log("Received",message)
          let receivedDataString=message.toString();
document.getElementById('receivedData').textContent=receivedDataString;
        });

        // sendMessage()
        // peerjsConnection.send(this.message);
        const messageInput=document.getElementById('mesageInput')as HTMLInputElement;
        const message=messageInput.value
     
 
        peerjsConnection.send(message)
        
      });
      // sendMessage()
    });

  }


  // sendMessage(peerjsConnection:any){
  //   const messageInput=document.getElementById('mesageInput')as HTMLInputElement;
  //   const message=messageInput.value

  //   peerjsConnection.send(message)
  // }

  connectWithPeer():void{
    this.connect(this.peerIdShare)
  }

  private connect=(id:any)=>{
    console.log("connected")
  var conn=this.peer.connect(id)
  conn.on('open',function(){
    conn.on('data',function(data){
      console.log('Received',data)
let receivedDataString=data.toString();
document.getElementById('receivedData').textContent=receivedDataString;
    });
    const messageInput=document.getElementById('mesageInput')as HTMLInputElement;
     const message=messageInput.value
  
    conn.send(message)
  })

  }


  logOut(){
    localStorage.clear();
  }

}
