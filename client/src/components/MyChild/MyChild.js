import React, {Component} from 'react';
import './MyChild.css';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';
import Child from '../Child/Child';


import { isAuth } from '../../actions/auth';

export default class MyChild extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
       children:[],
       menuStatus: 0,
       addChild:false,
       img:''

       }
    
this.handleClick=this.handleClick.bind(this);
this.handleClose=this.handleClose.bind(this);
this.image=this.image.bind(this);



    }

    componentDidMount(){
      if(isAuth()!==null)
this.setState({children:isAuth().childs})
    }
     handleClick = (event) => {
      this.setState({anchorEl:event.currentTarget});
    };
  
     handleClose = () => {
       this.setState({anchorEl:null});
      
    };
    image(url){
this.setState({img:url})
    }

   
      render() {
        if(isAuth()===null){
        return <Redirect to={'/'}/>;

        }
     if(this.state.addChild)
     {
       this.setState({addChild:false})
       return <Redirect to={'/ChildRegistration'}/>
     }
    return (
      
    <div  className='UserDashboard'>
    
<UserDashboardNav user={isAuth()}  ShopCart={false}/>
      <div className='my-children-user'> 
      <div className='title-children-user'>
        <h3 className='user-name' >הילדים שלי</h3>
        <Button onClick={()=>this.setState({addChild:true}) } id='add-child-btn' variant="outlined" color="primary"> <Icon id='plus'>add_circle</Icon>  רישום ילד חדש</Button>
        </div>
        {isAuth().childs.length===0?(<p>לא נמצאו ילדים</p>):''}
        <div style={{ width:'100%' ,alignItems:'center', textAlign:'center', marginTop:'10px'}}>
        {isAuth().childs.map((item,index)=>{
          console.log(item)
          return <Child key={index} child={item} user={isAuth()} updateUser={this.props.updateUser} />
        })}
</div>

      </div>

    </div>

    );
  }
}
