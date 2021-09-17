const mongoose = require('mongoose');
const crypto=require('crypto');
const Schema = mongoose.Schema;
const User = new Schema({
    name : {
        type: String,
        required: true,
        trim:true,
        max:32,
    lowecase:true
    },  
 
      //email
      email : {
        type: String,
        required: true,
        trim:true,
        unigue:true,
        index:true,
        lowecase:true

    },
    type:{
        type:String,
        default:"1"
    },
      childs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Child"
        }
      ],
      cart: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        }
      ],
    //passeword
    
    hashed_password:{
        type: String,
        required: true
    },
    salt: String,
    tokenID:String,
    role:{
        type:Number,
        trime:true
    },
    resetPasswordLink:{
        data:String,
        default:''

    },

},{timestamps:true});

User.virtual('password')
.set(function(password){
    //create a temporarity variable called _password
    this._password=password
    //generate salt
    this.salt=this.makeSalt()

    //encryptPassword
    this.hashed_password=this.encryptPassword(password)
    console.log("pass: "+this.encryptPassword(password));

})
.get(function(){
    return this._password
});

User.methods={

    authenticate:function(plainText){
        return this.encryptPassword(plainText)==this.hashed_password;

    },

    encryptPassword: function(password){

        if(!password) return ''
        try{


            return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
        }catch(err){
            return err;
        }
    },
    makeSalt:function(){
        return Math.round(new Date().valueOf()*Math.random())+'';
    }

}

module.exports = mongoose.model('User', User);