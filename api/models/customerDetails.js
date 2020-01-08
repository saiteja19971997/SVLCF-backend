const mongoose = require('mongoose');

const customerSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    group: String,
    phoneNumber: String
});

module.exports = mongoose.model('customerDetails',customerSchema);