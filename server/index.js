const express =require('express');
const cors=require('cors');
const http=require('http');
const socketIo=require('socket.io')
const dbPool = require('./database/database');
const app=express();
require('dotenv').config();
const userRoutes=require('./routes/users')
const bodyParser=require('body-parser')
const server=http.createServer(app)
const io=socketIo(server)

app.use(bodyParser.json())
app.use(cors());
// app.use(express.json());
app.use('/user',userRoutes)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
  next();
});



// app.get('/', (req, res) => {
//     res.send('server is running')
//   })




const PORT=7000;

app.listen(PORT,(req,res)=>{
    console.log(`listening on port ${PORT}`)
})


io.on('connection',(socket)=>{
  console.log('New Client connected');

  socket.on('chatMessage',(message)=>{
    console.log(`Received Message:${message}`);
    io.emit('message',message);
  });

  socket.on('disconnect',()=>{
    console.log('client disconnected');
  })

});
