import React, { Component } from 'react';
import './NewFoodMenuEvent.css';

import { Redirect } from "react-router-dom";

import Config from '../../config/config';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { isAuth } from '../../actions/auth';

registerLocale('es', es)
export default class Event extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
     

delete:false,

    }

  
this.deleteEvent=this.deleteEvent.bind(this);


  }


deleteEvent(){
   
  axios.delete(Config.getServerPath()+'menu/'+this.props.event._id+'/'+this.props.day._id)
  .then(res => {
    console.log(res.data.status)
if(res.data.status===404){
return
}
this.props.updateMenuEvent(res.data.day)

this.setState({delete:true})

  })
  .catch(() => {}   );
  console.log('delete food')
}


  render() {
    // if(this.props.user===null)
    // return <Redirect to={'/'}/>;

      if(this.state.delete) return '';
    return (

      <div className={this.props.big?'event-menu':'event-menu-small'} style={{display:'flex'}} dir="rtl">
        
            {/* <p className={this.props.big?'time':'time-small'}>{this.state.menu} -</p> */}
        <p className={this.props.big?'discription-menu':'discription-menu-small'}> <span class="iconify" data-icon="ic:baseline-restaurant-menu" data-inline="false"></span>  {this.props.event.discription}</p>
        {(isAuth().type=='0'||isAuth().type=='2') &&!this.props.big?  <button onClick={this.deleteEvent} className='delete-event-b'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button>:''}



      

     
      </div>
    );
  }
}
