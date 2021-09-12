'use strict';
const Product = require('../models/product');
const User = require('../models/user');
const nodemailer = require('nodemailer');
var easyinvoice = require('easyinvoice');
var fs = require('fs');
var dateFormat = require('dateformat');


const createProduct =  (req, res) => {
const data= req.body;
    const product= new Product({
        name:data.name,
        price:data.price,
        status:data.status,
        url:data.url
    })
        product.save().then(newProduct => {
            res.json({ status: 200 });
        }).catch((e) => {
            res.json({ status: 404 });
        });
}

 const getAllProducts= (req,res)=>{
    const prod= Product.find({}).then((prod)=>{
        res.json(prod);
    })
 }


 const deleteProd=  (req,res)=>{
    Product.findById(req.params.id).then((pro)=>{
      pro.remove().then(()=>{
        getAllProducts(req,res)
        //   res.json({status:200})
      })
    })
      .catch((e)=>{
          res.json({status:404})
      })
  }

const updateProduct=  (req,res)=>{
    const data=req.body;
    Product.findByIdAndUpdate(req.params.id,{
        name:data.name,
        price:data.price,
        status:data.status,
        url:data.url
        },{new:true}).then((P)=>
        getAllProducts(req,res)
        )
    .catch((e)=>{
        res.json({status:404})
    })
}

const addToCart=  (req,res)=>{
    const userId= req.params.uId;
    const proId= req.params.pId;
    Product.findById(proId).then((pro)=>{
        if(pro!=null){
            User.findByIdAndUpdate(userId,{
                $push: {
                    cart: {
                        $each: [pro],
                        $position: 0
                    }
                }
            },{new:true}).then(()=> getUser(req,res))
            .catch((e)=>{
                res.json({status:400})
            })
        }else{
            res.json({status:404})
        }
    })
 
}

const RemoveFromCart= async (req,res)=>{
    const id= req.params.Uid;
   

    const ProductID=req.params.Pid;
    const index= req.params.index;
    User.findById(id).then((user)=>{
      if(user!=null){
        User.findByIdAndUpdate(id,{
            $unset: {
                ["cart."+index]: 1
            }
        },{new:true}).then(async ()=>{ 
           const n= await temp(id,res);
           if(n)  return getUser(req,res);
            return res.json({status:400});
        })
        .catch((e)=>{
            res.json({status:400})
        })
      }
  }).catch((e)=>{
        res.json({status:404})
    })
}

const temp= (id,res)=>{
      return User.findByIdAndUpdate(id,{
            $pull: {
               cart:null
            }
        },{new:true}).then(()=>  true).catch(()=> false)
}
const total= async (id)=>{
   // const id=req.params.id;
    var total=0;
    var count=Number;
    const user = await User.findById(id).populate('cart').exec((err, docs)=>{
        if(err){
            return null;
        }else{
            for(const pro of docs.cart) {
             count = parseFloat(pro.price);
             total=total+count;
            }    
        }

    })
     return total;
}
const totalPrice=  (req,res)=>{
     const id=req.params.ID;
     var total=0;
     var count=Number;
     const user = User.findById(id).populate('cart').exec((err, docs)=>{
         if(err){
            return res.json({status: 404})
         }else{
             for(const pro of docs.cart) {
              count = parseFloat(pro.price);
              total=total+count;
             }  
             return res.json({status:200, sum:total})  
         }
 
     })
 }



const getUser= (req,res)=>{
    const id= req.params.id;
   const user= User.findById(id).populate('cart').populate('childs').exec((err, docs)=>{
       if(err){
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
               "city": "",
               "country": ""

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
const Pay= async(req,res)=>{
    const id= req.params.id;
    var cart=[Object];
    const user= await User.findById(id).populate('cart');  
    const email=user.email;
    cart=user.cart;
    let cartProduct=[];
    //let sum= await total(id);
    var total=0;
    var count=Number;
    //let sum=0;
cart.forEach(c=>{
    cartProduct.push(
    {
        "quantity": "1",
        "description": c.name,
        "tax": 17,
        "price": c.price
    }
    )
    count = parseFloat(c.price);
    total=total+count;
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
        }
    });
    const userTemp= User.findByIdAndUpdate(id,{
        $unset: {
            cart: 1
        }
    },false).then((u)=> res.json({status:200, user:u}))
    .catch((e)=>{
        res.json({status:400})
    })
}


module.exports = {
    createProduct,
    getAllProducts,
    deleteProd,
    updateProduct,
    addToCart,
    total,
    getUser,
    RemoveFromCart,
    Pay,
    PayPdf,
    totalPrice
}