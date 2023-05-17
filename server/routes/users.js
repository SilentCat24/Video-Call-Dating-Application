const express=require('express');
const router=express.Router();
const dbPool=require('../database/database');
const mysql=require('mysql');
const jwt=require('jsonwebtoken')
var cookieParser = require('cookie-parser')
// const md5=require('md5')
const bcrypt=require('bcrypt')
const salt=10;






router.post('/register',async function(req,res){
    const {fullname,age,address,email,password,city,gender,peerId,image}=req.body;
    
    dbPool.query('select email from userImg where email=?',[email],
    async(error,result)=>{
        if(error){
            confirm.log(error);
        }
        if(result.length>0){
            return res.send({
                msg:"email id already Taken",
                msg_type:"error",

            });
        }
        let hashedPassword=await bcrypt.hash(password,8);
        dbPool.query(
            'insert into userImg set ?',
            {fullname:fullname,age:age,email:email,password:hashedPassword,city:city,gender:gender,peerId:peerId,image:image},
            (error,result)=>{
               if(error){
                console.log(error);
               }else{
                return res.send({
                    msg:"user Registration success",
                    msg_type:"good",
                })
               }
            }
        )
    }
    )

})




router.post('/login',async function(req,res){
try{
    const {email,password}=req.body;
    // if(!userName||!password){
    //     res.send({msg:'please enter your email or password'})
    // }
    dbPool.query('select * from userImg where email=?',[email],
    async(error,result)=>{
        console.log(result);
        if(result<=0){
            return res.send({msg:"email is wrong"})
        }else if(!(await bcrypt.compare(password,result[0].password))){
                return res.send({
                    msg:"password is wrong",
                    msg_type:"error"
                })
                // console.log('password is wrong')
            }else{
                const id=result[0].ID;
                const token=jwt.sign({id:id},process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXPIERS_IN,
                });
                console.log('The Token is' +token);
                const cokkieOptions={
                    expires:new Date(
                        Date.now()+
                        process.env.JWT_COOKIE_EXPIRES *24 *60 *60 *1000
                    ),
                    httpOnly:true,
                };
                // res.cookie('joes',token,cokkieOptions)
                res.send(
                    {token:token,data:result,statusCode:1,msg:"your Logged in"}
                )


            }
        }
    
    
        )

}catch(err){
console.log(err)
}



})






// router.post('/login',async function(req,res,next){
//     try{
//         let{username,password}=req.body;

//         // const hashedPassword=bcrypt.hash(password)
//         const sql=`select *from users where username= ? AND password=?`
//         dbPool.query(sql,[username,password],
//             function(err,result,fields){
//                 if(result.length===1){
//                     let token=jwt.sign({data:result},'secret')
//                     res.send({status:1,
//                         data:result,
//                         token:token,
//                         msg:"your logged in"
//                     })
//                 }else{
//                     res.send('Your not authorised')
//                 }

//             })
//     }catch(error){
//         res.send({status:0,error:error});
//     }
// })



router.get('/all',(req,res)=>{
   const sql='select *from userImg';
   dbPool.query(sql,(err,results)=>{
    if(err){
        console.log(err)
        return res.send('error while fetching data')
    }
    res.send(results)
    console.log(results)
   })
    

})

module.exports=router;