const express = require('express');
const router = express.Router();
const Person = require('./../model/Person');

router.get('/',async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})
router.post('/',async (req,res)=>{
    try{
        const data = req.body;      //assuming req.body constains the data
 
        //creating a new person document
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'});
    }
})

router.get('/:workType',async (req,res)=>{
    try{
        const workType = req.params.workType; //extract worktype from url parameter
        if(workType == 'chef' || workType == 'manager' || workType=='waiter'){
            const response = await Person.find({work:workType});
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"Bad Request"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const personUpdated = req.body;
        const response = await Person.findByIdAndUpdate(personId,personUpdated,{
            new:true,
            runValidators:true,
        })
        if(response==null){
            res.status(404).json({error:'Person Not Found'});
        }
        console.log('Data Updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(response==null){
            res.status(404).json({error:'Person Not Found'});
        }
        res.status(200).json({message:'Person Successfully Deleted'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// comment for testing purposes
module.exports = router;