import express from 'express';
import _ from 'lodash';

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

router.get('/search',(req,res)=>{
	const search = req.query.car

	Product.find({brand: new RegExp('^'+search, 'i')},(err,dataB)=>{
		Product.find({model:new RegExp('^'+search, 'i')},(err,dataM)=>{
			// let data =  _.uniqBy(_.union([...dataB,...dataM]),'OnjectId')
			let data = _.unionWith(dataB, dataM, _.isEqual)
			console.log(data)
			res.json({data:data})
		})
	})

})

export default router;
