import React, { Component } from 'react';
import './ShopCart.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';
import ImageUploading from '../ImageUploading/SingleFileUploadComponent';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Divide as Hamburger } from 'hamburger-react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CloseIcon from '@material-ui/icons/Close';
import Config from '../../config/config';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';

registerLocale('es', es)
export default class ShopCartProduct extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
     

delete:false,
alert:false,
      endTime:'',

    }

  
this.deleteEvent=this.deleteEvent.bind(this);
this.addCart=this.addCart.bind(this);


  }

  addCart(){
this.setState({alert:true})
  }
deleteEvent(){
   
  axios.delete(Config.getServerPath()+'product/'+this.props.user._id+'/'+this.props.product._id+'/'+this.props.index)
  .then(res => {
    console.log(res.data.status)
if(res.data.status!=200){
return
}
this.props.getTotal();
this.props.setTotal();
this.props.updateUser();
this.setState({delete:true})

  })
  .catch(() => {}   );
}


  render() {


      if(this.state.delete) return '';
    return (

      <div className='shopcart-product'  dir="rtl">
        
        <img className='shopcart-img'src={this.props.product.url} />
    
            <p className='shopcart-details-name'>{this.props.product.name} </p>
            <p className='shopcart-details-price'>  {this.props.product.price} ₪</p>
         
      <button onClick={this.deleteEvent} className='delete-product-cart'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button>
     

      

     
      </div>
    );
  }
}
