const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Menu = new Schema({
    date : {
        type: Date,
    },  
    foods: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food"
        }
      ],
},{timestamps:true});


module.exports = mongoose.model('Menu', Menu);
