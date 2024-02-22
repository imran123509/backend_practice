const express=require('express');
const { signupfun } = require('../controllers/userControllers');

const router=express.Router();
router.post('/signup', signupfun);
module.exports=router