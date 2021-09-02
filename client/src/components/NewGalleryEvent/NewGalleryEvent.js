import React, { Component,Fragment } from 'react';
import './NewGalleryEvent.css';

import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import ImageUploading from '../ImageUploading/MultiFileUploadComponent';

import Config from '../../config/config';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)
export default class NewGalleryEvent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
  
      exit: false,



      startDate:new Date(),
      Photos:[],
     
      updateMode:false,
      add:false,
      

 

    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeSelectMenu = this.handleChangeSelectMenu.bind(this);

    this.addEvet = this.addEvet.bind(this);
    this.openNew = this.openNew.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.ClearError = this.ClearError.bind(this);



  }
  componentDidMount(){
    if(this.props.location.update){

      this.setState({updateMode:true})
      let date=this.props.location.date
      let d=new Date(date);
      this.setState({startDate:d})
    
   
    }
  }
  
  handleAddEvent(item){

    const postData = {
      date: this.state.startDate,
      photos: item,
  };
    axios.post(Config.getServerPath()+'photo',postData)
    .then(res => {
if(res.data.status===400){
  console.log('error')
return
}
console.log(res.data)
this.props.updateGalleryEvent(res.data.day);

this.setState({ exit: true });


    })
    .catch(() => {    console.log('send')
  }   );



  }
  ClearError(){

    this.setState({discriptionE:false})
    this.setState({menuE:false})
 


  }
  addEvet(url) {
   let item=this.state.Photos;
   url.map((img,index)=>{
    item.push( img);

   })
   this.setState({Photos:item})
   this.handleAddEvent(item);
  this.setState({ exit: true });


  }
  
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ exit: true });

  };
  handleChangeSelectMenu(event) {
    this.setState({ menu: event.target.value });

  }
 
  openNew(){

    this.setState({add:!this.state.add});
  }


  render() {
    if(this.props.user.type!=='0'&&this.props.user.type!=='2')
    return <Redirect to={'/'}/>;
    if (this.state.exit)
      return <Redirect to={'/GalleryPlan'} />;
    return (

      <div className='new-img-event' dir="rtl">

        <h3 className='titel-new-event'><u>הוספת אלבום תמונות</u> </h3>
        <DatePicker disabled={this.state.updateMode} id='date-piker'   dateFormat="dd/MM/yy" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} />
        
<div id='form-event-div-g'>
       <ImageUploading addEvet={this.addEvet} close={this.handleClose}/>
      </div>
        <br />
  
      </div>

    );
  }
}
