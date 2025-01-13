const {Router} = require('express');

const adminRouter = Router();

const {adminModel} = require('../db');

const {z} = require('zod');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')

const {auth,JWT_SECRET} = require('../middlewares/auth');

const express = require('express');

const app = express();


adminRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(100),
    name: z.string().min(3).max(100),
  });

  const parseBody = requiredBody.safeParse(req.body);

  if(!parseBody.success){
    return res.json({
      message: "Incorrect Formate",
      error: parseBody.error
    });
  }

  const { email, password, name } = parseBody.data;  

  try{
    const saltRound = 5;
    const passwordHashed = await bcrypt.hash(password,saltRound);

    await adminModel.create({
      email : email,
      password : passwordHashed,
      name : name  
    });
    return res.json({
      message: "You are SignedUp successfully",
      });
  }
  catch(error){
    return res.json({
      message : "User already exist please get to the Sign-In page"   
    });
  }

});

adminRouter.post("/signin", async (req, res) => {
  const {email,password} = req.body;

  const user = await adminModel.findOne({
    email: email
  });

  const passwordMatch = await bcrypt.compare(password , user.password);

  if(user && passwordMatch){
    const JWTtoken = jwt.sign({
      id : user._id
    },JWT_SECRET);
    res.json({
      JWTtoken: JWTtoken.toString()
    })
  }
  else{
    res.status(403).json({
      message: "Credentials wrong "
    })
  }
});

app.use(auth);

adminRouter.post("/course", (req, res) => {
  
});

adminRouter.put("/course", (req, res) => {
  res.json({
    message: "course",
  });
});

adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    message: "bulk",
  });
});


module.exports = {
    adminRouter
} 