import React, { Component } from 'react';
import './NewShopProduct.css';

import { Redirect } from "react-router-dom";

import CloseIcon from '@material-ui/icons/Close';
import Config from '../../config/config';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import {isAuth} from '../../actions/auth';

registerLocale('es', es)
export default class Event extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
     

delete:false,
alert:false,
edit:false,

    }

  
this.deleteProduct=this.deleteProduct.bind(this);
this.addCart=this.addCart.bind(this);


  }

  addCart(){
    axios.post(Config.getServerPath()+'productCart/'+this.props.user._id+'/'+this.props.product._id)
    .then(res => {
      console.log(res.data.status)
  if(res.data.status===404){
  return
  }
  this.setState({alert:true})
  this.props.setTotal(1);

  this.props.updateUser();

    })
    .catch(() => {}   );
  
  }
  deleteProduct(){
   
  axios.delete(Config.getServerPath()+'product/'+this.props.product._id)
  .then(res => {
    console.log(res.data.status)
if(res.data.status===404){
return
}
this.props.updateShopProduct(res.data);
this.setState({delete:true})


  })
  .catch(() => {}   );
}


  render() {
    if(this.state.edit)
    return <Redirect to={{pathname:'/NewShopProduct' ,update:true, product:this.props.product}} />;
    if (this.state.exit)
      return <Redirect to={'/shop'} />;
      if(this.state.delete) return '';
    return (

      <div className='event-product-e'  >
        
        <img className='product-img'src={this.props.product.url} />
        <div className='product-details'>
            <p className='product-details-name'>{this.props.product.name} </p>
            <p className='product-details-price'>  {this.props.product.price} ₪</p>
            </div>
            {(isAuth().type=='0'||isAuth().type=='3')? <button onClick={this.deleteProduct} className='delete-product'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button>:      <button onClick={this.addCart} className='add-cart-product'><span class="iconify" data-icon="iconoir:shopping-bag-add" data-inline="false" ></span></button>
  }
      {(isAuth().type=='0'||isAuth().type=='3')?  <button onClick={()=>this.setState({edit:true})} className='update-product'><span class="iconify" data-icon="tabler:edit" data-inline="false" ></span></button>:''}

      <br/>
     {this.state.alert?( <div className='success-alert-div'><Alert id='success-alert' severity="success"    action={
            <IconButton id='close-icon'
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                this.setState({alert:false});
              }}
            >
              <CloseIcon  fontSize="inherit" />
            </IconButton>
          }>
        <AlertTitle  id='success-alert-title'>הפריט נוסף  </AlertTitle>
        למעבר לסל — <a href='/shopCart'><strong>לחץ כאן!</strong></a>
      </Alert></div>):''}


      

     
      </div>
    );
  }
}
