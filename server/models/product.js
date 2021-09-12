const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({
    name : {
        type: String,
        required: true,
        trim:true,
        max:32,
        lowecase:true
    },  
    price:{
        type:String
    },
    status:{
        type:Boolean
    },
    url:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('Product', Product);
