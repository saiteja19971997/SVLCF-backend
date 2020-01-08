const mongoose = require('mongoose');

const groupSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    Start_date: String,
    End_date: String,
    chit_value: String,
    Installment_amount: String,
    Action_time: String
});

module.exports = mongoose.model('groupDetails',groupSchema);