const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Galery = new Schema({
    date : {
        type: String,
    },  
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo"
      }
    ],
},{timestamps:true});


module.exports = mongoose.model('Galery', Galery);
