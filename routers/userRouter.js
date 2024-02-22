const express=require('express');
const { signupfun, signinfun } = require('../controllers/userControllers');
const router=express.Router();
router.post('/signup', signupfun);
router.get('/signin', signinfun)
module.exports=router;