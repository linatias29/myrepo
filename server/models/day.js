const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Day = new Schema({
    date : {
        type: Date,
        unigue:true,

    },  
    events: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event"
        }
      ],
},{timestamps:true});


module.exports = mongoose.model('Day', Day);
