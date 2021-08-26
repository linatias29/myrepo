'use strict';
const Child = require('../models/child');
const User = require('../models/user');
const Product = require('../models/product');
const nodemailer = require('nodemailer');
var easyinvoice = require('easyinvoice');
var fs = require('fs');
var dateFormat = require('dateformat');

const createChild =  (req, res) => {
const childID= req.body.childID;
const id= req.params.id
    Child.findOne({childID}).then((child)=>{
        if(child != null){
            res.json({status:404})
            return
        }else{
    const child = new Child({
        name:req.body.name,
        childID:req.body.childID,
        garde:req.body.garde,
        school:req.body.school,
        Pphone:req.body.Pphone,
        Pemail:req.body.Pemail,
        Pname:req.body.Pname,
        SD:req.body.SD,
        wayHome:req.body.wayHome,
        photoUrl:req.body.photoUrl

    });
    child.save().then(newChild => {
            User.findByIdAndUpdate(id,{
                $push: {
                    childs: {
                        $each: [newChild],
                        $position: 0
                    }
                }
            },{new:true}).then(()=> getUser(req,res))
            .catch((e)=>{
                res.json({status:400})
            })
        }).catch((e) => {
        console.log(e);
        res.json({ status: 400 });
    });



        }
    }).catch((e) => {
        console.log(e);
        res.json({ status: 400 });
    })

}

 const getAllChilds= (req,res)=>{
    const children= Child.find({}).then((childrens)=>{
        res.json(childrens);
    })
 }


 const deleteChild=  (req,res)=>{
    const user= req.params.Uid;
    const child=req.params.Cid
  User.findById(user).then((user)=>{

      if(user!=null){
        User.findByIdAndUpdate(user,{
            $pullAll: {
                childs: [child]
            }
        },{new:true}).then(()=> res.json({status:200}))
        .catch((e)=>{
            res.json({status:400})
        })
      }
  }).catch((e)=>{
        res.json({status:404})
    })
}

const updateChild=  (req,res)=>{
    Child.findByIdAndUpdate(req.params.idChild,{
        name:req.body.name,
        childID:req.body.childID,
        garde:req.body.garde,
        school:req.body.school,
        Pphone:req.body.Pphone,
        Pemail:req.body.Pemail,
        Pname:req.body.Pname,
        SD:req.body.SD,
        wayHome:req.body.wayHome,
        photoUrl:req.body.photoUrl
        },{new:true}).then(()=> res.json({status:200}))
    .catch((e)=>{
        res.json({status:400})
    })
}
const getUser= (req,res)=>{
    const id= req.params.id
   const user= User.findById(id).populate('childs').exec((err, docs)=>{
       if(err){
           console.log("not ok");
           return res.json({status: 404})
       }else{
          return res.json({status:200, user:docs})
       }
   })
}

const PayPdf= async(user,sum,cart)=>{
    var date=dateFormat(new Date(), "dd-mm-yyyy");  
    var data = {
        "documentTitle": "קבלה", //Defaults to INVOICE
        //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
        "currency": "ILS", //See documentation 'Locales and Currency' for more info
        "taxNotation": "מע״מ", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "background": fs.readFileSync('./logocamp1.png', 'base64'), //or base64 //img or pdf
        "sender": {
            "company": "קייטנת עושים גלים",
            "address": "המרכבה 20 ",
            "zip": "",
            "city": "חולון",
            "country": "ישראל"
        },
        "client": {
               "company": user.name,
               "address": user.email,
               "zip": "",
               "city": "חולון",
               "country": "ישראל"
        },
        "invoiceNumber": "2021.0001",
        "invoiceDate": date,
        "products": cart,
        // "bottomNotice": "Kindly pay your invoice within 15 days.",
        //Used for translating the headers to your preferred language
        //Defaults to English. Below example is translated to Dutch
        "translate": { 
            "invoiceNumber": "מס הזמנה",
            "invoiceDate": "תאריך הזמנה",
            "products": "מוצרים", 
            "quantity": "כמות", 
            "price": "מחיר",
            "subtotal": "סה״כ",
            "vat":"מע״מ",
            "gst":"מע״מ",
            "total": "סה״כ" 
        }
    };
    
    //Create your invoice! Easy!

    const result = await easyinvoice.createInvoice(data);                       
 return await fs.writeFileSync("invoice.pdf", result.pdf, 'base64')

}
const Payment= async(req,res)=>{
    const id= req.params.id;
    let cartProduct=[];
    const user= await User.findById(id);  
    var total=1200;
    cartProduct.push(
    {
        "quantity": "1",
        "description": "רישום ילד",
        "tax": 17,
        "price": total
    })
    var totalTex=total+(total*0.17);
    let emailText= 
		'<h3 dir="rtl">שלום, '+user.name+'</h3>'+
        '<h3 dir="rtl"> מצורפת קבלה על תשלום בסך כולל של : ' +totalTex +' &#8362;</h3>'
		;
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'summercampWeb123@gmail.com',
            pass: 'S.123456789' 
        },
        tls:{
            rejectUnauthorized:false
        }
    });

 

await PayPdf(user,total,cartProduct);
    let mailDetails = {
        from: 'summercampWeb123@gmail.com',
        to: user.email,
        subject: 'קייטנת עושים גלים- קבלה',
        html:emailText,
        attachments: [
            {
              filename: "invoice.pdf",
              path: "./invoice.pdf",
            }]
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
            res.json({status:200})
        }
    });
}


module.exports = {
    createChild,
    getAllChilds,
    deleteChild,
    updateChild,
    Payment
}