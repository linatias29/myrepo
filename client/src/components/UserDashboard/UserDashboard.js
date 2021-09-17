import React, {Component} from 'react';
import './UserDashboard.css';

import {Redirect} from "react-router-dom";

import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';
import EventDay from '../NewDayEvent/Event';
import EventMenu from '../NewFoodMenuEvent/Event';

import { isAuth } from '../../actions/auth';
import { format } from 'date-fns';

export default class UserDashboard extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
       children:[],
       menuStatus: 0,
       addChild:false,
       img:''

       }
    
this.handleClick=this.handleClick.bind(this);
this.handleClose=this.handleClose.bind(this);
this.image=this.image.bind(this);



    }

    componentDidMount(){
      if(isAuth()!==null)
this.setState({children:isAuth().childs})
    }
     handleClick = (event) => {
      this.setState({anchorEl:event.currentTarget});
    };
  
     handleClose = () => {
       this.setState({anchorEl:null});
      
    };
    image(url){
this.setState({img:url})
    }

   
      render() {
        if(isAuth()===null){
        return <Redirect to={'/'}/>;

        }
     if(this.state.addChild)
     {
       this.setState({addChild:false})
       return <Redirect to={'/ChildRegistration'}/>
     }
    return (
      
    <div  className='UserDashboard-e'>
    
<UserDashboardNav user={isAuth()}  ShopCart={false}/>
      <div className='today-plan'> 
      <div className='title-children-user'>
        <h3 className='paln-today' >מה עושים היום     <p className='paln-today-p'>{format(new Date(), 'dd/MM/yy')}</p>
</h3>
        </div>
        
        <div className='today'>
        {this.props.dayEvent.filter((d)=>format(new Date(d.date), 'dd/MM/yy')===format(new Date(), 'dd/MM/yy')).length===0?<p className='today-title'>אין תוכנית להיום</p>:<p className='today-title'> מה התוכנית היום?</p>}
       {this.props.dayEvent.filter((d)=>format(new Date(d.date), 'dd/MM/yy')===format(new Date(), 'dd/MM/yy')).map((item,index)=>{
        
        return item.events.map((item, index) => {
          return <EventDay key={index} event={item} big={false} day={this.props.day} updateDayEvent={this.props.updateDayEvent}/>

        })
      
       })}
        {this.props.menuEvent.filter((d)=>format(new Date(d.date), 'dd/MM/yy')===format(new Date(), 'dd/MM/yy')).length===0?<p className='today-title'>אין תפריט להיום</p>:<p className='today-title'> מה נאכל היום?</p>}
{console.log(this.props.menuEvent.filter((d)=>format(new Date(d.date), 'dd/MM/yy')===format(new Date(), 'dd/MM/yy')))}
         {this.props.menuEvent.filter((d)=>format(new Date(d.date), 'dd/MM/yy')===format(new Date(), 'dd/MM/yy')).map((item,index)=>{
           console.log(item)
          return <>
           <div className='menu-type'>
          {item.foods.filter((a)=>a.category.includes('10')).length!=0?( <p className='menu-type-title-e'><u>  <span class="iconify" data-icon="whh:restaurantmenu" data-inline="false"></span>  ארוחת בוקר</u></p>):''}
         { item.foods.filter((a)=>a.category.includes('10')).map((item,index)=>{
          
           return  <EventMenu key={index} event={item} day={this.props.day} big={false} updateMenuEvent={this.props.updateMenuEvent}/>
 
         })}
         </div>
         <div className='menu-type'>
          {item.foods.filter((a)=>a.category.includes('20')).length!=0?( <p className='menu-type-title-e'><u>  <span class="iconify" data-icon="whh:restaurantmenu" data-inline="false"></span>  ארוחת צהריים</u></p>):''}
          { item.foods.filter((a)=>a.category.includes('20')).map((item,index)=>{
           return  <EventMenu key={index} event={item}day={this.props.day} big={false}updateMenuEvent={this.props.updateMenuEvent}/>
          
         })}
         </div>
         <div className='menu-type'>
          {item.foods.filter((a)=>a.category.includes('30')).length!=0?( <p className='menu-type-title-e'><u>  <span class="iconify" data-icon="whh:restaurantmenu" data-inline="false"></span>  ארוחת אחר צהריים</u></p>):''}
          { item.foods.filter((a)=>a.category.includes('30')).map((item,index)=>{
           return  <EventMenu key={index} event={item}day={this.props.day} big={false} updateMenuEvent={this.props.updateMenuEvent}/>
 
         })}
         </div>
</>
        
      
       })}
</div>

      </div>

    </div>

    );
  }
}
