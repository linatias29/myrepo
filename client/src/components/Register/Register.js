import React, { Component } from 'react';
import './Register.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import FormHelperText from '@material-ui/core/FormHelperText';

import {Redirect} from "react-router-dom";
import {signup,isAuth} from '../../actions/auth';


export default class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      usernameE: false,
      password: '',
      passwordE: false,
      mail:'',
      mailE:false,
      mailEmsg:'',

    }

    this.handelSubmit = this.handelSubmit.bind(this);

  }
  

  handelSubmit() {
   
    this.setState({mailE:false})
    this.setState({usernameE:false})
    this.setState({passwordE:false})



    let error=false;
    if(this.state.username===''){
      this.setState({usernameE:true})
    error=true;
    }


    if(this.state.mail===''){
    this.setState({mailEmsg:"חסר מייל"})
    this.setState({mailE:true})
    error=true;

    }else  if(!this.state.mail.includes('@')){
      this.setState({mailEmsg:"מייל לא תקין"})
      this.setState({mailE:true})
    error=true;
    }
    if(this.state.password===''){
      this.setState({passwordE:true})
      error=true;
      }
   

    if(error) return
    const postData = {
      email: this.state.mail.trim(),
      password: this.state.password,
      name:this.state.username,
  };
  signup(postData)
    .then(res => {
if(res.data.status==='faild'){
  this.setState({mailEmsg:"המייל כבר קיים"})
  this.setState({mailE:true})
return
}


    })
    .catch(() => {}   );
    console.log('send')
  }


  render() {
    if(isAuth())
    return <Redirect to={'/UserDashboard'}/>;
    return (
      <div className='Register' >
{/* {this.handelSubmit()} */}
        <h1 className='h1-register'> קייטנת עושים גלים <span className='summer_txt-register'>חלום של קיץ</span></h1>
        <p id='pText-register' className='h1-register'>דף הרשמה</p>
        <div  id='register-form' >
          <FormControl className='login'  >
            <InputLabel id="input-user" htmlFor="input-user"  >שם משתמש</InputLabel>
            <Input required type='text' error={this.state.usernameE} id="input-user" aria-describedby="my-helper-text" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
            {this.state.usernameE?  <FormHelperText  error={this.state.usernameE} id="helper">חסר שם </FormHelperText>:''}

          </FormControl>

          <br />
          <FormControl  >

<InputLabel id="input-mail" htmlFor="input-mail">מייל</InputLabel>

<Input required type='email' error={this.state.mailE}  id="input-mail" aria-describedby="my-helper-text" value={this.state.mail} onChange={(e) => this.setState({ mail: e.target.value })} />
    {this.state.mailE?  <FormHelperText  error={this.state.mailE} id="helper">{this.state.mailEmsg}</FormHelperText>:''}

</FormControl>
<br/>

          <FormControl>

            <InputLabel id="input-pass" htmlFor="input-pass">סיסמא</InputLabel>

            <Input id="input-pass" error={this.state.passwordE} required type='password' id="input-pass" aria-describedby="my-helper-text" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
            {this.state.passwordE?  <FormHelperText  error={this.state.passwordE} id="helper">חסר סיסמא </FormHelperText>:''}

          </FormControl>

          <br/>
        
   
          <button  onClick={this.handelSubmit} id='register-submit'  type="submit" value="Submit" variant="outlined" color="primary"  >
            הירשם
    </button>
<br/>


    <a href='/' className='login-link'>משתמש רשום? לחץ להתחברות</a>

        </div>
      </div>

    );
  }
}
