const express = require('express')
const router = express.Router()
const Users = require('../Models/Users')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

router.post('/sign-up', async (req, res, next) => {
    try{
        const hash = bcrypt.hashSync(req.body.values.password, saltRounds);
        const user = new Users({
        ...req.body.values,
        password: hash
        })
        await user.save()
        res.status(201).json({Status: "Sign-Up Success"})
    }catch{
        res.status(404).send("Sign-Up failed")
    }
})

router.post('/login', async (req, res, next) => {
    try{
        const user = await Users.findOne({email: req.body.values.email})
        if(user.length === 0) {
            return res.status(501).json({Message:"No Records existed"})
        } 
        const passwords = (bcrypt.compareSync(req.body.values.password, user.password)) 
        if(!passwords) {
           return res.status(401).json({Message:"Invalid password"})
        } else{
            const token = jwt.sign({user:{id: user._id, name:user.name, email:user.email}}, process.env.JWT_KEY, { expiresIn: "1d" });
            res.cookie('token', token, { sameSite: 'None', secure: true });
            return res.json({Status:"success"})
        }
        
    }catch(err){
        console.log(err)
        res.status(404).json({Message: "Server side error"})
    }
})

const Verify = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ Message: "we need token please provide it ." })
    } else {
      jwt.verify(token,process.env.JWT_KEY,(err, decoded) => {
        if (err) {
          return res.json({ Message: "Authentication Error." });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    }
  };

router.post('/verify', Verify, (req, res, next) => {
    return res.status(200).json({ Status: "Verify-Success", user: req.user });
})

router.post('/logout', Verify, (req, res) => {
      res.cookie('token',"",{expiresIn:new Date(0)})
      return res.status(200).json({ Status: "Success" });
 
});

router.get('/', async (req, res, next) => {
  try{ const users = await Users.find({})
       res.status(201).json(users)
  }catch{
      res.status(404).send("Sign-Up failed")
  }
})




module.exports = router
