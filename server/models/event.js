const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = new Schema({
    discription : {
        type: String,
        required: true,
        trim:true,
        max:32,
    lowecase:true
    },  
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    }
},{timestamps:true});


module.exports = mongoose.model('Event', Event);
