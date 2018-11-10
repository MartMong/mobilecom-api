import express from 'express';

import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.post('/',(req,res)=>{
    console.log(req.body)
    const {email,password,name,date} = req.body.user;
    const newDate = date.split("-").reverse().join("/");
    var birthDate = new Date(newDate)
    const user = new User({email,name,birthDate});
    user.setPassword(password);
    user.save()
        .then(userRecord => {
            res.json({status:'Sign up Success'})
        })
        .catch(err=>res.status(400).json({errors:parseErrors(err.errors)}));
   
})

// response user detail
router.get('/',authenticate,(req,res)=>{
    const {email,name} = req.currentUser;

    res.json({user:{email,name}});



})


export default router;