const mongoose = require('mongoose');
const customer = require('../models/customerDetails');

exports.get_members_with_id=(req, res, next) => {
    const id = req.params.groupId;
    customer.find({group: id})
    .select('name group phoneNumber')
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

exports.post_members_createmember= (req, res, next) => {
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
        message:"member created susccesfully"
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

exports.delete_members_with_id = (req,res,next)=>{
    const id = req.body._id;
    const group = req.body.group;
    customer.remove({_id : id})
    .exec()
    .then(result =>{
        customer.find({group: group})
        .select('_id name group phoneNumber')
        .exec()
        .then(docs => {
             const response = {
                 customers: docs
             };
             res.status(200).json(response);
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
   
}
exports.post_members_edit_name = (req,res,next)=>{
    const name = req.params.name;
    const customerDetails= new customer({
        name: req.body.name,
        group: req.body.group,
        phoneNumber: req.body.phoneNumber
    });
    customer.updateOne({name: name},customerDetails)
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