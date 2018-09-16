import express from 'express';

import User from '../models/User';
import parseErrors from '../utils/parseErrors';

const router = express.Router();

router.post('/',(req,res)=>{
    console.log(req.body)
    const {email,password,name} = req.body.user;
    const user = new User({email,name});
    user.setPassword(password);
    user.save()
        .then(userRecord => {
            res.json({status:'Sign up Success'})
        })
        .catch(err=>res.status(400).json({errors:parseErrors(err.errors)}));
   
})
export default router;