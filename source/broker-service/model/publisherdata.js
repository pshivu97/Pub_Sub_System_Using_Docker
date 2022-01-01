const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema({
    name : {type: String, required: true},
    calories : Number,
    protein: Number
});

const pubData =  mongoose.model('PubData',pubSchema);
module.exports = pubData;