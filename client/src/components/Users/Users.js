import React, {Component} from 'react';
import './Users.css';
import FormControl from '@material-ui/core/FormControl';

import {Redirect} from "react-router-dom";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Config from '../../config/config';
import axios from 'axios';

export default class Users extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
  
        error:'',
        userType:this.props.user.type,
        toggle:false,
        saveButoon:false,
        delete:false,

       }
    
this.handleClick=this.handleClick.bind(this);
this.handleChangeSelect=this.handleChangeSelect.bind(this);
this.updateUser=this.updateUser.bind(this);
this.deleteUser=this.deleteUser.bind(this);



    }

    
    deleteUser(){
   
      axios.delete(Config.getServerPath()+'user/'+this.props.user._id)
      .then(res => {
  if(res.data.status===404){
  return
  }
  this.props.updateUsers();
  this.setState({delete:true})
  
      })
      .catch(() => {}   );
console.log('delete user')
    }
     handleClick = (event) => {
       this.setState({toggle:!this.state.toggle})
    };
  
    handleChangeSelect(event){
      if(event.target.value==this.props.user.type)
      this.setState({saveButoon:false});
      else this.setState({saveButoon:true});

      this.setState({userType:event.target.value});


    }
   
    updateUser(){

      const postData = {
        type: this.state.userType.trim(),
     
    };
      axios.post(Config.getServerPath()+'user/'+this.props.user._id,postData)
      .then(res => {
  if(res.data.status==='faild'){
  return
  }
  this.props.updateUsers();
  this.setState({saveButoon:false});
  
      })
      .catch(() => {}   );
console.log('update user')
    }

      render() {
        if(this.props.user===null)
        return <Redirect to={'/'}/>;
     if(this.state.delete) return '';
    return (
      
    <div  className='Users'>
     <button className='users-btn' onClick={this.handleClick}>{this.props.user.name}</button>
     {this.state.toggle?(<div className='user-detail'>
       <div style={{display:'flex', position:'relative'}}>

       <p>מייל : {this.props.user.email}</p>
       <button onClick={this.deleteUser} className='delete'><span class="iconify" data-icon="eva:person-delete-fill" data-inline="false"></span></button>

       </div>
       <div style={{display:'flex'}}>
       <p>סוג משתמש :  </p>
       <FormControl  variant="standard" id='userType-select-user'>
        <Select
        required
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
          value={this.state.userType}
          onChange={this.handleChangeSelect}
          displayEmpty
        >
    {/* <MenuItem value="parent">
            <em>הורה</em>
          </MenuItem> */}
         <MenuItem value='1'>הורה</MenuItem>
          <MenuItem value='0'>מנהל</MenuItem>
          <MenuItem value='3'>אחראי מוצרים</MenuItem>
          <MenuItem value='4'>אחראי לוז</MenuItem>
          <MenuItem value='2'>מדריך</MenuItem>
        </Select>
      </FormControl>
      {this.state.saveButoon?<button onClick={this.updateUser} className='save'>     <span class="iconify" data-icon="dashicons:saved" data-inline="false"></span>
</button>:''}
      </div>


     </div>):''}


    </div>

    );
  }
}
