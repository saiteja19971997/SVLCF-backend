const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const group = require('../models/groupDetails');
const check_auth = require('../middleware/check-auth'); 


router.get('/', (req, res, next) => {
    group.find()
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

router.post('/creategroup', (req, res, next) => {
    const groupDetails= new group({
       _id: new mongoose.Types.ObjectId(),
       name: req.body.name,
       Start_date: req.body.Start_date,
       End_date: req.body.End_date,
       chit_value: req.body.chit_value,
       Installment_amount: req.body.Installment_amount,
       Action_time: req.body.Action_time
   });
   groupDetails
   .save()
   .then(result => {
    res.status(200).json({
         message: "saved"
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