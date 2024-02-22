const zod=require('zod')
const {User}=require('../models/users');
const jwt=require('jsonwebtoken')
const signupBody=zod.object({
    username:zod.string().email(),
    password: zod.string()
})

const JWT_SECRET="adjhfkhfhsriu123";

const signupfun=async(req, res)=>{
     const {username}=signupBody.safeParse(req.body);
     if(username){
         return res.status(401).json({
            msg: "this username is already exist"
         })
     }
     const user=await User.create({
          username: req.body.username,
          password: req.body.password
     });
     const userId=user._id;
     const token=jwt.sign({
          userId
     },JWT_SECRET);


     res.json({
        msg: "signup created successfully",
        token:token
     })
}

const signinBody=zod.object({
    username:zod.string().email(),
    password: zod.string()
});

const signinfun=async(req, res)=>{

    try {
        const {username}=req.body;
      if(!username){
        return res.status(401).json({
            msg: "username or password is invalid"
        })
      }

      const user=await User.findOne({
          username:req.body.username,
          password: req.body.password
      });

      if(user){
          const token=jwt.sign({
            userId: user._id
          },JWT_SECRET);
          res.json({
              msg: "login successfully",
              token: token
          });
          return
      } 
    } catch (error) {
        console.log(`somthing went wron ${error}`)
    }
     


}

module.exports={
   signupfun, 
   signinfun
}
