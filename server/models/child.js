const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Child = new Schema({
    name : {
        type: String,
        required: true,
        trim:true,
        max:32,
    lowecase:true
    },  
 
      childID : {
        type: String,
        required: true
    },
    garde:{
        type:String
    },
    school:{
        type:String
    },
    Pphone:{
        type:String
    },
    Pemail:{
        type:String
    },
    Pname:{
        type:String
    },
    SD:{
        type:String
    },
    wayHome:{
        type:String
    },
    photoUrl:{
        type:String
    }
},{timestamps:true});


module.exports = mongoose.model('Child', Child);
