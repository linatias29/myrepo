'use strict';
const { addListener } = require('../models/food');
const Food = require('../models/food');
const Menu = require('../models/menu');

const createFood =  (req, res) => {
    const date= req.body.date;
    var foods=[Object];
    foods= req.body.foods;
                Menu.findOne({date}).then(  (menu)=>{
                    if(menu != null){
                      
                     foods.forEach((one,index)=>{
                            var food = new Food({
                                discription:one.discription,
                                category:one.category
                            });
                            food.save().then(newFood=>{
                        Menu.findByIdAndUpdate(menu._id,{
                            $push: {
                                foods:{
                                    $each:[newFood],
                                    $position:0
                                } 
                            }
                        }).exec((err,docs)=>{
                             if(index==foods.length-1)
                             return getAllFoods(req,res)

                        })
                    })
                })
               
                    }else{
                        const temp= new Menu({
                            date:date
                        });
                        temp.save().then( async (menu)=>{
                            await foods.forEach((one,index)=>{
                                var food = new Food({
                                    discription:one.discription,
                                    category:one.category
                                });
                                food.save().then(newFood=>{
                            Menu.findByIdAndUpdate(menu._id,{
                                $push: {
                                    foods:{
                                        $each:[newFood],
                                        $position:0
                                    } 
                                }
                            }).exec((err,docs)=>{
                                if(index==foods.length-1){
                                return getAllFoods(req,res)
                                }
                            })
                        })
                    })
    
                 })
    
             }
        }) 
    }
 const getAllFoods =  (req, res) => {

    var myCurrentDate=new Date();
    var myPastDate=new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate()-1);
    Menu.find({ "date" : { $gt: myPastDate } } ).populate('foods').exec((err, docs)=>{
                if(err){
                    return res.json({status: 404})
                }else{
                    docs.sort((a,b)=>a.date-b.date);
                   return res.json({status:200, day:docs})
                }
            });  
 
}

 const deleteFood=  (req,res)=>{
    const id= req.params.Did;
    const FoodID=req.params.Fid
  Menu.findById(id).then((menu)=>{

      if(menu!=null){
        Menu.findByIdAndUpdate(id,{
            $pullAll: {
                foods: [FoodID]
            }
        },{new:true}).then((m)=>
        getAllFoods(req,res)
        //  res.json({status:200,menu:m})
         )
        .catch((e)=>{
            res.json({status:400})
        })
      }
  }).catch((e)=>{
        res.json({status:404})
    })
}
const deleteMenu=  (req,res)=>{
    Menu.findById(req.params.id).then((menu)=>{
      menu.remove().then((m)=>{
        getAllFoods(req,res)

        //   res.json({status:200, menu:m})
      })
    })
      .catch((e)=>{
          res.json({status:404})
      })
  }

 


module.exports = {
    createFood,
    getAllFoods,
    deleteFood,
    deleteMenu
}