import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

// Todo :add uniqueness and email validations to email field
const schema = new mongoose.Schema({
    email:{
        type:String ,
        require:true,
        lowercase:true,
        index:true,
        unique:true
    },
    // unique can use because uniqueValidator
    passwordHash:{type:String,requir:true},
    name:{
        type:String,
        require:true
    }
},{timeStamp:true});

schema.plugin(uniqueValidator , {message:'this email is already taken'});

schema.methods.setPassword = function setPassword(password){
    this.passwordHash = bcrypt.hashSync(password,10);
}

schema.methods.isValidPassword = function isValidPassword(password){
    return bcrypt.compareSync(password,this.passwordHash);
}

schema.methods.generateJWT = function generateJWT(){
    return jwt.sign({
        email:this.email,
    },
    process.env.JWT_SECRET);
}

schema.methods.toAuthJSON = function toAuthJSON(){
    return {
        email:this.email,
        token : this.generateJWT()
    }
}

export default mongoose.model('User',schema);

