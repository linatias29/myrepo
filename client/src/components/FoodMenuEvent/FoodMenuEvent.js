import React, {Component} from 'react';
import PoolBack from '../../Images/poolback.jpeg';
import './FoodMenuEvent.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import Navbar from '../Navbar/Navbar1';
import { Divide as Hamburger } from 'hamburger-react'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Config from '../../config/config';
import axios from 'axios';
import Event from '../NewFoodMenuEvent/Event';
import { format } from 'date-fns';
import { isAuth } from '../../actions/auth';


export default class FoodMenuEvent extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
     
        toggle:false,   
        add:false,  

       }
    
this.handleClick=this.handleClick.bind(this);
this.handleChangeSelect=this.handleChangeSelect.bind(this);
this.deleteFoodMenu=this.deleteFoodMenu.bind(this);
this.addToMenu=this.addToMenu.bind(this);



    }
 
  date=format(new Date(this.props.day.date), 'dd/MM/yy')
  deleteFoodMenu(){
   
      axios.delete(Config.getServerPath()+'menu/'+this.props.day._id)
      .then(res => {
  if(res.data.status===404){
  return
  }
  this.props.updateMenuEvent(res.data.day)
  this.setState({delete:true})
  
      })
      .catch(() => {}   );
console.log('delete menu')
    }
     handleClick = (event) => {
       this.setState({toggle:!this.state.toggle})
    };
  
    handleChangeSelect(event){
      if(event.target.value==this.props.user.type)
      this.setState({saveButoon:false});
      else this.setState({saveButoon:true});

      this.setState({userType:event.target.value});


    }
   
   addToMenu(){

    this.setState({add:true});
   }

      render() {
        if(this.state.add)
    return <Redirect to={{pathname:'/NewFoodMenuEvent' ,update:true, date:this.props.day.date}} />;
     if(this.state.delete) return '';
    return (
      
    <div  className='menu-event'>
     <button className='menu-btn' onClick={this.handleClick}>{this.date}</button>
     {(isAuth().type=='0'||isAuth().type=='2')?<button onClick={this.deleteFoodMenu} className='delete-event-btn'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button>:''}

     {this.state.toggle?(<div className='event-details'>
       {/* <div style={{ position:'relative'}}> */}

    
        <div className='menu-type'>
         {this.props.day.foods.filter((a)=>a.category.includes('10')).length!=0?( <p className='menu-type-title-e'><u>  <span class="iconify" data-icon="whh:restaurantmenu" data-inline="false"></span>  ארוחת בוקר</u></p>):''}
        { this.props.day.foods.map((item,index)=>{
          if(item.category.includes('10'))
          return  <Event key={index} event={item} day={this.props.day} big={false} updateMenuEvent={this.props.updateMenuEvent}/>

        })}
        </div>
        <div className='menu-type'>
         {this.props.day.foods.filter((a)=>a.category.includes('20')).length!=0?( <p className='menu-type-title-e'><u>  <span class="iconify" data-icon="whh:restaurantmenu" data-inline="false"></span>  ארוחת צהריים</u></p>):''}
        { this.props.day.foods.map((item,index)=>{
                  if(item.category.includes('20'))
          return  <Event key={index} event={item}day={this.props.day} big={false}updateMenuEvent={this.props.updateMenuEvent}/>

        })}
        </div>
        <div className='menu-type'>
         {this.props.day.foods.filter((a)=>a.category.includes('30')).length!=0?( <p className='menu-type-title-e'><u>  <span class="iconify" data-icon="whh:restaurantmenu" data-inline="false"></span>  ארוחת אחר צהריים</u></p>):''}
        { this.props.day.foods.map((item,index)=>{
                  if(item.category.includes('30'))
          return  <Event key={index} event={item}day={this.props.day} big={false} updateMenuEvent={this.props.updateMenuEvent}/>

        })}
        </div>
      
        {(isAuth().type=='0'||isAuth().type=='2')? <button onClick={this.addToMenu} className='add-to-event-menu'><span id='plus-menu' class="iconify" data-icon="bi:plus-lg" data-inline="false" ></span>הוסף </button>:''}

       {/* </div> */}

     </div>):''}


    </div>

    );
  }
}
