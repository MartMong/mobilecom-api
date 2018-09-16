import express from 'express';
import User from '../models/User';
const router = express.Router();

router.post('/',(req,res)=>{
    const {credentials} = req.body;
    console.log(credentials)
    User.findOne({email:credentials.email}).then(user=>{
        
        if(user==null){
            res.status(400).json({errors:{email:"Don't have this Account"}})

        }
        else if(user && user.isValidPassword(credentials.password)){
            res.json({user :user.toAuthJSON()});
        }
        else{
            res.status(400).json({errors:{password:"Wrong Password"}});
        }
    }) ;  
});

export default router;