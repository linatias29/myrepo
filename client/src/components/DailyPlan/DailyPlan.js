import React, {Component} from 'react';
import './DailyPlan.css';
import {Redirect} from "react-router-dom";
import DayEvent from '../DayEvent/DayEvent';
import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';
import Config from '../../config/config';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { isAuth } from '../../actions/auth';
import { format } from 'date-fns';

export default class DailyPlan extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
        dailyPlan:[],
        newDay:false,
        update:false,
        startDate:'',


       }
    
this.handleClickAddDay=this.handleClickAddDay.bind(this);
this.UpdatePage=this.UpdatePage.bind(this);
this.cleanDateSelect=this.cleanDateSelect.bind(this);


    }
     today = new Date();

    date =  this.today.getDate()  + '/' + (this.today.getMonth() + 1) + '/' +this.today.getFullYear();

     handleClickAddDay = (event) => {
       this.setState({newDay:true})
    };
  
  cleanDateSelect(){
    this.setState({startDate:''})
  }
    UpdatePage(){
      if(this.props.location.update){
        axios.get(Config.getServerPath()+'events')
        .then(res => {
          
          this.setState({dailyPlan:res.data.day})
          this.setState({update:true})
    
        })
      }
    }
      render() {
        if(this.props.user===null){
          return <Redirect to={'/'}/>;
          }
       if(this.state.newDay)
        return <Redirect to={'/NewDayEvent'}/>;
    return (
      
    <div  className='DailyPlan'>
<UserDashboardNav user={this.props.user}/>
<div className='daily-plan'>
<p className='shop-titles'> מה עושים?</p>

{(isAuth().type==='0'||isAuth().type==='4')?<button onClick={this.handleClickAddDay} className='Daily-plan-add-btn'>הוסף לוז יומי </button>:''}
<div className='date-select'>
{this.state.startDate!==''?<button  onClick={this.cleanDateSelect} className='date-select-btn-clean' ><span class="iconify" data-icon="ph:x" data-inline="false" ></span></button>:''}

<DatePicker placeholderText='בחר תאריך לסינון' id='date-piker-select'   dateFormat="dd/MM/yy" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} />
</div>
</div>

<div className='all-day'>
{ this.props.dayEvent.map((item,index)=>{
     if(item.events.length===0) return '';

  if(this.state.startDate!==''){
   const dateState=format(new Date(this.state.startDate), 'dd/MM/yy')
   const dateItem=format(new Date(item.date), 'dd/MM/yy')

        if(dateState===dateItem)
          return <DayEvent key={index} day={item} updateDayEvent={this.props.updateDayEvent}/>
  }else  return <DayEvent key={index} day={item} updateDayEvent={this.props.updateDayEvent} />

        })}
</div>

    </div>

    );
  }
}
