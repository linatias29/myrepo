import React, { Component } from 'react';
import PoolBack from '../../Images/poolback.jpeg';
import './ChildRegistration.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import Navbar from '../Navbar/Navbar1';
import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';
import ImageUploading from '../ImageUploading/SingleFileUploadComponent';
import PaymentForm from '../PaymentForm/Forms/PaymentForm';

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Divide as Hamburger } from 'hamburger-react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Config from '../../config/config';
import axios from 'axios';
export default class ChildRegistration extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      childName: '',
      childNameE:false,
      childId: '',
      childIdE: false,
      childClass: '',
      childClassE: false,
      childSchool: '',
      childSchoolE: false,
      childPerantName: '',
      childPerantNameE: false,
      childPerantPhone: '',
      childPerantPhoneE: false,
      childPerantMail: '',
      childPerantMailE: false,
      childDifficulties: '',
      Collection: 'Pickup',
      exit: false,
      error:false,
      childImage:'',
      updateMode:false,
      child:'',
      pay:false,

    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleAddChild = this.handleAddChild.bind(this);
    this.ClearError = this.ClearError.bind(this);
    this.setImage = this.setImage.bind(this);
    this.childValidation = this.childValidation.bind(this);
    this.handelUpdateChild = this.handelUpdateChild.bind(this);
    this.handleAddChildPay = this.handleAddChildPay.bind(this);



  }
  componentDidMount(){
    if(this.props.location.update){
      console.log(this.props.location.child)

      this.setState({updateMode:true})
      let child=this.props.location.child
      this.setState({child:this.props.location.child})
      this.setState({childName:child.name})
      this.setState({childId:child.childID})
      this.setState({childClass:child.garde})
      this.setState({childSchool:child.school})
      this.setState({childPerantPhone:child.Pphone})
      this.setState({childPerantName:child.Pname})
      this.setState({childPerantMail:child.Pemail})
      this.setState({childDifficulties:child.SD})
      this.setState({Collection:child.wayHome})
      this.setState({childImage:child.photoUrl})




    }
  }

  ClearError(){

    this.setState({childPerantMailE:false})
    this.setState({childPerantPhoneE:false})
    this.setState({childPerantNameE:false})
    this.setState({childSchoolE:false})
    this.setState({childClassE:false})
    this.setState({childIdE:false})
    this.setState({childNameE:false})


  }
  handelUpdateChild(){
    if(this.childValidation()===true) return


    const Data = {
      name:this.state.childName,
      childID:this.state.childId,
      garde:this.state.childClass,
      school:this.state.childSchool,
      Pphone:this.state.childPerantPhone,
      Pemail:this.state.childPerantMail,
      Pname:this.state.childPerantName,
      SD:this.state.childDifficulties,
      wayHome:this.state.Collection,
      photoUrl:this.state.childImage
   
  };
    axios.post(Config.getServerPath()+'childId/'+this.state.child._id,Data)
    .then(res => {
      if(res.data.status===400){//הילד קיים
      this.setState({error:"המייל כבר קיים"})
      return
      } 
      console.log(this.props.updateUser())

        this.setState({ exit: true });

          })
          .catch(() => {}   );
        
      

  }
  childValidation(){
    this.ClearError();
let error=false;
    if(this.state.childName===''){
    this.setState({childNameE:true})
    error=true;

    
    }
    if(this.state.childId===''){
      this.setState({childIdE:true})
      error=true;

      
      }
      if(this.state.childClass===''){
        this.setState({childClassE:true})
        this.setState({error:true})

        }
        if(this.state.childSchool===''){
          this.setState({childSchoolE:true})
          error=true;

          }



          if(this.state.childPerantName===''){
            this.setState({childPerantNameE:true})
            error=true;

            }
            if(this.state.childPerantPhone===''){
              this.setState({childPerantPhoneE:true})
              error=true;


              
              }
              if(this.state.childPerantMail===''|| !this.state.childPerantMail.includes('@')){
                this.setState({childPerantMailE:true})
                error=true;

                }
              
                return error;
  }
  handleAddChildPay(){
    if(this.childValidation()===true) return
this.setState({pay:true})
  }
  handleAddChild() {

              
                if(this.childValidation()===true) return


                const Data = {
                  name:this.state.childName,
                  childID:this.state.childId,
                  garde:this.state.childClass,
                  school:this.state.childSchool,
                  Pphone:this.state.childPerantPhone,
                  Pemail:this.state.childPerantMail,
                  Pname:this.state.childPerantName,
                  SD:this.state.childDifficulties,
                  wayHome:this.state.Collection,
                  photoUrl:this.state.childImage
               
              };
                axios.post(Config.getServerPath()+'child/'+this.props.user._id,Data)
                .then(res => {
                  if(res.data.status===400){//הילד קיים
                  this.setState({error:"המייל כבר קיים"})
                  return
                  } 
                  this.props.updateUser();
                    this.setState({ exit: true });

                      })
                      .catch(() => {}   );
                      console.log('send')
                    
                  

  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ exit: true });

  };
  handleChangeSelect(event) {
    this.setState({ Collection: event.target.value });

  }
  setImage(url){
    this.setState({childImage:url});
  }

  jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  render() {
    // if(this.props.user===null)
    // return <Redirect to={'/'}/>;
    if (this.state.exit)
    return <Redirect to={'/UserDashboard'} />;
    if(this.state.pay)
    return <PaymentForm price={'1200'} user={this.props.user}child={true} handleAddChild={this.handleAddChild}/> 

    return (
      <div className='ChildRegistration' dir="rtl">
{console.log(this.props.location.update)}

        {this.state.updateMode?<h3 className='titel-ChildReg'><u>טופס עדכן ילד</u> </h3>:<h3 className='titel-ChildReg'><u>טופס רישום ילד</u> </h3>}

        <FormControl id='form' >

          <InputLabel id="child" htmlFor="child-name">שם הילד</InputLabel>

          <Input aria-describedby="helper"  error={this.state.childNameE} required type='text' id="child-name" value={this.state.childName} onChange={(e) => this.setState({ childName: e.target.value })} />
          {this.state.childNameE?  <FormHelperText  error={this.state.childNameE} id="helper">חסר שם הילד</FormHelperText>:''}

        </FormControl>
        <br />
        <FormControl id='form'>

          <InputLabel id="child" htmlFor="child-id">תעודת זהות</InputLabel>

          <Input aria-describedby="helper" error={this.state.childIdE} required type='text' id="child-id" value={this.state.childId} onChange={(e) => this.setState({ childId: e.target.value })} />
          {this.state.childIdE?  <FormHelperText  error={this.state.childIdE} id="helper">חסר תעודת זהות</FormHelperText>:''}

        </FormControl>
        <br />
        <FormControl id='form'>

          <InputLabel dir="rtl" id="child" htmlFor="child-class">כיתה</InputLabel>

          <Input aria-describedby="helper"  required type='text' id="child-class" value={this.state.childClass} onChange={(e) => this.setState({ childClass: e.target.value })} />
          {this.state.childClassE?  <FormHelperText  error={this.state.childClassE} id="helper">חסר כיתה</FormHelperText>:''}

        </FormControl>
        <br />

        <FormControl id='form'>

          <InputLabel id="child" htmlFor="child-School">בית ספר</InputLabel>

          <Input aria-describedby="helper"  required type='text' id="child-School" value={this.state.childSchool} onChange={(e) => this.setState({ childSchool: e.target.value })} />
          {this.state.childSchoolE?  <FormHelperText  error={this.state.childSchoolE} id="helper">חסר בית ספר</FormHelperText>:''}

        </FormControl>
        <br />

        <FormControl id='form'>

          <InputLabel id="child" htmlFor="child-perant-name">שם הורה</InputLabel>

          <Input aria-describedby="helper"  required type='text' id="child-perant-name" value={this.state.childPerantName} onChange={(e) => this.setState({ childPerantName: e.target.value })} />
          {this.state.childPerantNameE?  <FormHelperText   error={this.state.childPerantNameE} id="helper">חסר שם ההורה</FormHelperText>:''}

        </FormControl>

        <br />

        <FormControl id='form'>

          <InputLabel id="child" htmlFor="child-perant-phone">טלפון הורה</InputLabel>

          <Input aria-describedby="helper"  required type='number' id="child-perant-phone" value={this.state.childPerantPhone} onChange={(e) => this.setState({ childPerantPhone: e.target.value })} />
          {this.state.childPerantPhoneE?  <FormHelperText  error={this.state.childPerantPhoneE} id="helper">חסר טלפון הורה</FormHelperText>:''}

        </FormControl>

        <br />

        <FormControl id='form'>

          <InputLabel id="child" htmlFor="child-perant-mail">מייל הורה</InputLabel>

          <Input  aria-describedby="helper"  required type='text' id="child-perant-mail" value={this.state.childPerantMail} onChange={(e) => this.setState({ childPerantMail: e.target.value })} />
          {this.state.childPerantMailE?  <FormHelperText  error={this.state.childPerantMailE} id="helper"> מייל הורה</FormHelperText>:''}

        </FormControl>
        <br />
        <FormControl variant="standard" id='form'>
          <InputLabel shrink id='child'>דרך איסוף</InputLabel>

          <Select
            required
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={this.state.Collection}
            onChange={this.handleChangeSelect}
            displayEmpty
          >

            <MenuItem value='Pickup'>עצמי</MenuItem>

            <MenuItem value='transportation'>הסעה</MenuItem>
          </Select>
        </FormControl>
        <br />

        <FormControl id='form'>


          <span>קשיים חברתיים</span>
          <TextareaAutosize aria-label="empty textarea" placeholder="קשייים חברתיים" minRows={3} />

        </FormControl>
        <br />
        <ImageUploading url={this.state.childImage} setImage={this.setImage}/>
        <br />
        <Button onClick={this.state.updateMode?this.handelUpdateChild:this.handleAddChildPay} id='child-submit' >{this.state.updateMode?'עדכון':'שליחה'}</Button>
        <Button onClick={this.handleClose} id='child-submit' >ביטול</Button>

      </div>
    );
  }
}
