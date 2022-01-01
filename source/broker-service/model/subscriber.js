const mongoose = require("mongoose");

const subscriberScehma = new mongoose.Schema({
    topic : {type: String},
    subscribers : Array
});

const sublist =  mongoose.model('Subscriber_list',subscriberScehma);
module.exports = sublist;