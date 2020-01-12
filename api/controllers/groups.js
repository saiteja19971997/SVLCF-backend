const group = require('../models/groupDetails')
const mongoose = require('mongoose');

exports.get_groups_all =  (req, res, next) => {
    group.find()
    .select()
    .exec()
    .then(docs => {
         const response = {
             customers: docs
         };
         res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
}

exports.post_group_create =  (req, res, next) => {
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
}

exports.delete_group_with_id = (req,res,next)=>{
    const id = req.params._id;
    group.remove({_id : id})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "deleted successfully"
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
   
}
exports.post_group_edit_id = (req,res,next)=>{
    const name = req.params.name;
    const groupDetails= new group({
        name: req.body.name,
       Start_date: req.body.Start_date,
       End_date: req.body.End_date,
       chit_value: req.body.chit_value,
       Installment_amount: req.body.Installment_amount,
       Action_time: req.body.Action_time
    });
    group.updateOne({name: name},groupDetails)
        .exec()
        .then(result =>{
            res.status(200).json({
                message:"sucessfully edited"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}