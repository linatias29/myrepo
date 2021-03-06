import React, {Component} from 'react';
import './Child.css';
import {Redirect} from "react-router-dom";
import Config from '../../config/config';
import axios from 'axios';
import { isAuth } from '../../actions/auth';

export default class Child extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
  
        error:'',
        toggle:false,
        saveButoon:false,
        delete:false,
        edit:false,

       }
    
this.handleClick=this.handleClick.bind(this);
this.handleChangeSelect=this.handleChangeSelect.bind(this);
this.deleteChild=this.deleteChild.bind(this);
this.openEdit=this.openEdit.bind(this);
this.closeEdit=this.closeEdit.bind(this);



    }

    deleteChild(){
   
      axios.delete(Config.getServerPath()+'child/'+this.props.user._id+'/'+this.props.child._id)
      .then(res => {
  if(res.data.status===404){
  return
  }
  this.props.updateUser();

  this.setState({delete:true})
  
      })
      .catch(() => {}   );
console.log('delete child')
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
    openEdit(){
      this.setState({edit:true})
    }
    closeEdit(){
      this.setState({edit:false})
    }
  
   

      render() {
        if(isAuth()===null)
        return <Redirect to={'/'}/>;
     if(this.state.delete) return '';
     if(this.state.edit)
       return <Redirect to={{pathname:'/ChildRegistration' ,update:true, child:this.props.child}} />;

    return (
      
    <div  className='child' style={{display:'flex'}}>
            
                <img onClick={this.handleClick} className='child-img' src={this.props.child.photoUrl}/> 
     {this.state.toggle?(<div className='child-details'>
       <div style={{ position:'relative'}}>
     
       <p>שם : {this.props.child.name}</p>
       <p>תעודת זהות : {this.props.child.childID}</p>
       <p>בית ספר : {this.props.child.school}</p>
       <p> כיתה : {this.props.child.garde}</p>
       <p>דרך הגעה : {this.props.child.wayHome}</p>
       <p> קשיים חברתיים : {this.props.child.SD}</p>

      {isAuth().type==='1'? <button  onClick={this.deleteChild} className='delete'><span class="iconify" data-icon="eva:person-delete-fill" data-inline="false"></span></button>:''}
      {isAuth().type==='0'||isAuth().type==='1'?  <button onClick={this.openEdit} className='update-child'><span class="iconify" data-icon="fa-solid:user-edit" data-inline="false" ></span></button>:''}

       </div>

     

     </div>):<p className='child-name'>{this.props.child.name}</p>}


    </div>

    );
  }
}
