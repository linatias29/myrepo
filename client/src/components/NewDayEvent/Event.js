import React, { Component } from 'react';
import './NewDayEvent.css';
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
      startTime:'',
      endTime:'',

    }

  
this.getTime=this.getTime.bind(this);
this.deleteEvent=this.deleteEvent.bind(this);


  }

componentDidMount(){
  this.setState({startTime:this.getTime(this.props.event.startTime)})
  this.setState({endTime:this.getTime(this.props.event.endTime)})

  

}
deleteEvent(){
   
  axios.delete(Config.getServerPath()+'event/'+this.props.event._id+'/'+this.props.day._id)
  .then(res => {
    console.log(res.data.status)
if(res.data.status===404){
return
}
this.props.updateDayEvent(res.data.day)

this.setState({delete:true})

  })
  .catch(() => {}   );
  console.log('delete - dayEvent')
}

getTime(time){
  if(time==10)
  return '08:00';

  if(time==20)
  return '09:00';
  
  if(time==30)
  return '10:00';

  if(time==40)
  return '11:00';

  if(time==50)
  return '12:00';

  if(time==60)
  return '13:00';

  if(time==70)
  return '14:00';

  if(time==80)
  return '15:00';

  if(time==90)
  return '16:00';

  if(time==100)
  return '17:00';
}
  render() {
    // if(this.props.user===null)
    // return <Redirect to={'/'}/>;
    if (this.state.exit)
      return <Redirect to={'/UserDashboard'} />;
      if(this.state.delete) return '';
    return (

      <div className={this.props.big?'event-time':'event-time-small'} style={{display:'flex',marginRight:'20px'}} dir="rtl">
        
            <p className={this.props.big?'time':'time-small-e'}>{this.state.startTime} -</p>
        <p className={this.props.big?'time':'time-small-e'}>{this.state.endTime}</p>
        <h4 className={this.props.big?'discription':'discription-small'}>{this.props.event.discription}</h4>
        {(isAuth().type=='0'||isAuth().type=='4')&& !this.props.big?  <button onClick={this.deleteEvent} className='delete-event'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button>:''}



      

     
      </div>
    );
  }
}
