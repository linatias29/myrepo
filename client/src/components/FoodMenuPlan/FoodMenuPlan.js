import React, {Component} from 'react';
import './FoodMenuPlan.css';
import {Redirect} from "react-router-dom";
import FoodMenuEvent from '../FoodMenuEvent/FoodMenuEvent';
import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';
import { isAuth } from '../../actions/auth';
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
export default class FoodMenuPlan extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
        newFoodMenu:false,
        startDate:'',
      

       }
    
this.handleClickAddFoodMenu=this.handleClickAddFoodMenu.bind(this);
this.cleanDateSelect=this.cleanDateSelect.bind(this);



    }
     today = new Date();

    date =  this.today.getDate()  + '/' + (this.today.getMonth() + 1) + '/' +this.today.getFullYear();

    handleClickAddFoodMenu = (event) => {
       this.setState({newFoodMenu:true})
    };
  
   
    cleanDateSelect(){
      this.setState({startDate:''})
    }

      render() {
        if(isAuth()===null){
         return <Redirect to={'/'}/>;
        }
        // return <Redirect to={'/'}/>;
       if(this.state.newFoodMenu)
        return <Redirect to={'/NewFoodMenuEvent'}/>;
    return (
      
    <div  className='DailyPlan'>
<UserDashboardNav user={this.props.user}/>
<div className='daily-plan'>
<p className='shop-titles'> מה אוכלים?</p>

 <button hidden={isAuth().type!=='0'&&isAuth().type!=='2'} onClick={this.handleClickAddFoodMenu} className='FoodPlan-add-btn'>הוסף תפריט יומי </button>
<div className='date-select'>
<button hidden={this.state.startDate===''} onClick={this.cleanDateSelect} className='date-select-btn-clean' ><span class="iconify" data-icon="ph:x" data-inline="false" ></span></button>

<DatePicker placeholderText='בחר תאריך לסינון' id='date-piker-select'   dateFormat="dd/MM/yy" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} />
</div>
</div>
<div className='all-menu'>
{ this.props.menuEvent.map((item,index)=>{
  if(item.foods.length===0) return '';
            if(this.state.startDate!==''){
              const dateState=format(new Date(this.state.startDate), 'dd/MM/yy')
              const dateItem=format(new Date(item.date), 'dd/MM/yy')
           
                   if(dateState===dateItem)
                   return <FoodMenuEvent day={item} updateMenuEvent={this.props.updateMenuEvent}/>
             }else  return <FoodMenuEvent day={item} updateMenuEvent={this.props.updateMenuEvent} />
        

        })}
</div>

    </div>

    );
  }
}
