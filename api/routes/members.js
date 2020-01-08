const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const customer = require('../models/customerDetails');
const check_auth = require('../middleware/check-auth'); 


router.get('/:groupId', (req, res, next) => {
    const id = req.params.groupId;
    customer.find({group: id})
    .select('name group phoneNumber')
    .exec()
    .then(docs => {
         const response = {
             count: docs.length,
             customers: docs
         };
         res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
});

router.post('/createmember', (req, res, next) => {
    const customerDetails= new customer({
       _id: new mongoose.Types.ObjectId(),
       name: req.body.name,
       group: req.body.group,
       phoneNumber: req.body.phoneNumber
   });
   customerDetails
   .save()
   .then(result => {
    res.status(200).json({
        

    });
       console.log(result);  
   })
   .catch(err=> {
       res.status(500).json({
          error: err
       });
       console.log(err)
   });
});

module.exports = router;