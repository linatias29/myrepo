import React, { Component,Fragment } from 'react';
import './NewShopProduct.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Config from '../../config/config';
import axios from 'axios';
import ImageUploading from '../ImageUploading/SingleFileUploadComponent';

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)
export default class NewShopProduct extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
  
      exit: false,
      ProductImage:null,
      ProductImageE:false,

      price:'',
      priceE:false,
      status:true,
      statusE:false,
    

      Events:[],
      add:false,
  

      name:'',
      nameE:false,
      updateMode:false,


    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeSelectStatus = this.handleChangeSelectStatus.bind(this);
    this.handelUpdateProduct = this.handelUpdateProduct.bind(this);

    this.addProduct = this.addProduct.bind(this);
    this.openNew = this.openNew.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.ClearError = this.ClearError.bind(this);
    this.setImage = this.setImage.bind(this);



  }
  componentDidMount(){
    if(this.props.location.update){

      this.setState({updateMode:true})
      let product=this.props.location.product
      this.setState({name:product.name})
      this.setState({price:product.price})
      this.setState({ProductImage:product.url})
      this.setState({status:product.status})
   
    }
  }
  handelUpdateProduct(){
    if(this.addProduct()) return;

    const Data = {
      name:this.state.name,
      price:this.state.price,
      url:this.state.ProductImage,
      status:this.state.status,
    
   
  };
    axios.post(Config.getServerPath()+'product/'+this.props.location.product._id,Data)
    .then(res => {
      if(res.data.status===400){//הילד קיים
      this.setState({error:"המייל כבר קיים"})
      return
      } 

      this.props.updateShopProduct(res.data)
      this.setState({ exit: true });

          })
          .catch(() => {}   );
          console.log('send')
        
      

  }
  handleAddEvent(){
    if(this.addProduct()) return;
    console.log('send')
    const postData = {
      name: this.state.name,
      price: this.state.price,
      status:this.state.status,
      url:this.state.ProductImage
  };
    axios.post(Config.getServerPath()+'product',postData)
    .then(res => {
if(res.data.status===400){
  console.log('error')
return
}
this.props.updateShopProduct(res.data)
this.setState({ exit: true });


    })
    .catch(() => {    console.log('send')
  }   );



  }
  ClearError(){

    this.setState({nameE:false})
    this.setState({priceE:false})
    this.setState({statusE:false})
    this.setState({ProductImageE:false})



  }
  addProduct() {
    this.ClearError();
    let error=false;

    if(this.state.name==''){
      this.setState({nameE:true})
      error=true
      
    }
    if(this.state.price==''){
      this.setState({priceE:true})
      error=true
    }
    if(this.state.status==''){
      this.setState({status:true})
      error=true
    }
    if(this.state.ProductImage==null){
      this.setState({ProductImageE:true})
      error=true
    }

   return error
  
    

  


  }
  setImage(url){
    this.setState({ProductImage:url});
    this.setState({ProductImageE:false})

  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ exit: true });

  };
  handleChangeSelectStatus(event) {
    this.setState({ status: event.target.value });

  }
 
  openNew(){

    this.setState({add:!this.state.add});
  }


  render() {
    if(this.props.user.type!=='0'&&this.props.user.type!=='3')
    return <Redirect to={'/'}/>;
    if (this.state.exit)
      return <Redirect to={'/shop'} />;
    return (

      <div className='new-product' dir="rtl">

        <h3 className='titel-new-event'><u>הוספת מוצר לחנות</u> </h3>
 
<div id='form-product-div'>
        <FormControl id='form-event' >

          <InputLabel id="child" htmlFor="child-name">שם המוצר</InputLabel>

          <Input aria-describedby="helper"  error={this.state.nameE} required type='text' id="child-name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
          {this.state.nameE?  <FormHelperText  error={this.state.nameE} id="helper">חסר שם מוצר</FormHelperText>:''}

        </FormControl>

        <FormControl id='form-event' >

<InputLabel id="child" htmlFor="child-name">מחיר המוצר</InputLabel>

<Input aria-describedby="helper"  error={this.state.priceE} required type='number' id="child-name" value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} />
{this.state.priceE?  <FormHelperText  error={this.state.priceE} id="helper">חסר מחיר מוצר</FormHelperText>:''}

</FormControl>



        <br />
        <div style={{display:'flex'}}>
       
        <FormControl  variant="standard" id='select-status'>
        <InputLabel error={this.state.statusE} shrink id='child'> סטטוס</InputLabel>

        <Select
        required
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
          value={this.state.status}
          onChange={this.handleChangeSelectStatus}
          displayEmpty
        >
      

       <MenuItem id='val' value={true}>במלאי</MenuItem>
       <MenuItem id='val' value={false}>אזל במלאי</MenuItem>

          
        </Select>
      </FormControl>

      
      </div>
<div className='product-add-img'>
      <ImageUploading url={this.state.ProductImage} setImage={this.setImage} />
      {this.state.ProductImageE?<p className='miss-img'>חסרה תמונה</p>:''}
      </div>
      </div>
  
        <br />
        <Button onClick={this.state.updateMode?this.handelUpdateProduct:this.handleAddEvent} id='product-submit-event' >{this.state.updateMode?'עדכון':'שליחה'}</Button>

        {/* <Button  onClick={this.addProduct} id='product-submit-event' >שליחה</Button> */}
        <Button onClick={this.handleClose} id='child-submit-event-cancel' >ביטול</Button>

      </div>

    );
  }
}
