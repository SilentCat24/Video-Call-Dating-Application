const mysql=require('mysql');
require('dotenv').config();

const dbPool=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})


dbPool.getConnection((err,connection)=>{
    if(err){
        console.log(err,"err")
        return;
    }else{
        console.log('connected to Database',connection.threadId)
    }
})


module.exports=dbPool;