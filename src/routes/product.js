import express from 'express';

import Product from '../models/Product';

const router = express.Router();

router.post('/',(req,res)=>{
    console.log(req.body)
    const data = req.body.product;
    const product = new Product(data);
    product.save()
        .then(
            added => res.json({status:added})
        )
        .catch(
            err => res.status(400).json({errors:err})
        )
})

router.get('/',(req,res)=>{
    Product.find({},(err,data)=>{
        if(!err){
            res.json({products:data})
        }else{
            res.status(400).json({status:err})
        }
    })




})

export default router;