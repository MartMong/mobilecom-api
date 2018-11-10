import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    productID:{
        type: Number,
        require : true,
        unique :true
    },
    name : {
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    model:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    details:[String],
    pictures:[String]

})


export default mongoose.model('Product',schema);