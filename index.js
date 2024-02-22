const express=require('express');
const mongoose=require('mongoose');
const usersRouters=require('./routers/userRouter')
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
main().catch(err=> console.log(err))

async function main(){
    await mongoose.connect('mongodb://localhost:27017/Cloudflare');
    console.log('database is coonected')
}
app.use('/api/v1', usersRouters);
app.listen(8080, ()=>{
    console.log(`server is connectd`)
})