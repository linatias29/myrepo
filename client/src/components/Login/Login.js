import React, {Component} from 'react';
import './Login.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";


import {signin,authenticate,isAuth} from '../../actions/auth';

export default class Login extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
        username:'',
        usernameE:false,
        usernameEmsg:'',
        password:'',
        passwordE:false,
        passwordEmsg:'',

        loginStatus:false,
        error:'',
       }
    
this.handelSubmit=this.handelSubmit.bind(this);

    }

handelSubmit(){

  this.setState({usernameE:false})
  this.setState({passwordE:false})
let error=false;
    this.setState({error:''})
    if(this.state.username===''){
    this.setState({usernameE:true})
    this.setState({usernameEmsg:'חסר שם משתמש'})
    error=true;

    }


    if(this.state.password===''){
      this.setState({passwordE:true})
      this.setState({passwordEmsg:'חסר סיסמא'})

      error=true;

      }
  
if(error) return;
    const postData = {
      password: this.state.password,
      email:this.state.username,
  };
  signin(postData).then((res)=>{
      if(res.data.status===404){
        this.setState({usernameE:true})
        this.setState({usernameEmsg:'השם משתמש לא קיים'})
              return
      }
      if(res.data.status===400)//pasaawor
    { this.setState({usernameE:true})
    this.setState({usernameEmsg:'השם משתמש לא נכון'})
    this.setState({passwordE:true})
      this.setState({passwordEmsg:' או הסיסמא לא נכונה'})
      return
    }

      // this.props.setUser(res.data.user)
       authenticate(res.data,()=>{  this.setState({loginStatus:true})})


    })
  
    .catch(() => {    console.log('send')
  }   );
  }




      render() {
        if(isAuth()!==null)
        return <Redirect to={'/UserDashboard'}/>;

    return (
    <div className='Home' >
      <div className='background_home'>        </div>

        <h1 className='h1'> קייטנת עושים גלים <span className='summer_txt'>חלום של קיץ</span></h1>
        <p id='pText'  className='h1'>18 שנה ברציפות</p>

        <div  id='login' >
        <FormControl className='login'  >
  <InputLabel id="input-user"  htmlFor="input-user"  >מייל</InputLabel>
  <Input  required type='text' error={this.state.usernameE} id="input-user" aria-describedby="my-helper-text" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})}/>
  {this.state.usernameE?  <FormHelperText  error={this.state.usernameE} id="helper">{this.state.usernameEmsg}</FormHelperText>:''}

</FormControl>
<br/>

        <FormControl  >
 
  <InputLabel id="input-pass" htmlFor="input-pass">סיסמא</InputLabel>

  <Input id="input-pass"  required type='password' error={this.state.passwordE}  id="input-pass" aria-describedby="my-helper-text" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
  {this.state.passwordE?  <FormHelperText  error={this.state.passwordE} id="helper">{this.state.passwordEmsg} </FormHelperText>:''}

</FormControl>
<br/>
<Button id='login-submit'  onClick={this.handelSubmit} type="submit" value="Submit" variant="outlined" color="primary"  >
  התחבר
    </Button>

</div>
<a href='/Register' className='register-link'> לא משתמש רשום? לחץ כדי להירשם</a>
    </div>

    );
  }
}
