import React, { Component } from 'react';
import './NewGalleryEvent.css';

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
      menu:'',

    }

  
this.deleteImg=this.deleteImg.bind(this);


  }


deleteImg(){
   
  axios.delete(Config.getServerPath()+'photo/'+this.props.day._id+'/'+this.props.eventId)
  .then(res => {
    console.log(res.data.status)
if(res.data.status===404){
return
}
this.props.updateGalleryEvent(res.data.day)
this.setState({delete:true})

  })
  .catch(() => {}   );
}


  render() {
    // if(this.props.user===null)
    // return <Redirect to={'/'}/>;
    if (this.state.exit)
      return <Redirect to={'/UserDashboard'} />;
      if(this.state.delete) return '';
    return (

      <div className={this.props.big?'event-gallery':'event-gallery-small'}  dir="rtl">
        
            {/* <p className={this.props.big?'time':'time-small'}>{this.state.menu} -</p> */}
        <img src={this.props.event} onClick={this.props.openImageViewer} className={this.props.big?'img-gallery':'img-gallery-small'}/>  
        {(isAuth().type=='0'||isAuth().type=='2') &&!this.props.big? <button onClick={this.deleteImg} className='delete-event-img'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button>:''}



      

     
      </div>
    );
  }
}
