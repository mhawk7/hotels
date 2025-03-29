const express = require('express');
const router = express.Router();
const MenuItem = require('./../model/Menu');

router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/',async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/:tasted',async (req,res)=>{
    try{
        const tasted = req.params.tasted;
        if(tasted=='sweet' || tasted=='sour' || tasted=='spicy'){
            const response = await MenuItem.find({taste:tasted});
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Bad Request'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const menuId = req.params.id;
        const updatedMenu = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenu,{
            new:true,
            runValidators:true,
        })
        if(response==null){
            res.status(404).json({error:'item not found'});
        }
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(response==null){
            res.status(404).json({error:'Item not found'});
        }
        res.status(200).json({message:'Item Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports = router;