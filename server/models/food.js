const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Food = new Schema({
    discription : {
        type: String,
        required: true,
        trim:true,
        max:32,
    lowecase:true
    },
    category:{
        type:String
    }
},{timestamps:true});


module.exports = mongoose.model('Food', Food);
