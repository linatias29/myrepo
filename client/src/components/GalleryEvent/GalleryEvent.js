import React, {Component} from 'react';
import './GalleryEvent.css';
import {Redirect} from "react-router-dom";
import Config from '../../config/config';
import axios from 'axios';
import Event from '../NewGalleryEvent/Event';
import { format } from 'date-fns';
import { isAuth } from '../../actions/auth';
import MyImageViewer from './MyImageViewer';


export default class GalleryEvent extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
  viewerImage:[],
  edit:false,
  isOpen:false,
  currentImage:0,

       }
    
this.handleClick=this.handleClick.bind(this);
this.handleChangeSelect=this.handleChangeSelect.bind(this);
this.deleteDay=this.deleteDay.bind(this);
this.closeImageViewer=this.closeImageViewer.bind(this);



    }
    componentDidMount(){
      let itemArr=[];
      this.props.day.photos.map((item,index)=>{
        itemArr.push(item.url)

      })
      this.setState({viewerImage:itemArr});
      // this.setState({event:sort})

    }
    openImageViewer = ((index) => {
      this.setState({currentImage:index})
      this.props.setShowMenu();
      this.setState({isOpen:true})
    })
    closeImageViewer = () => {
      this.setState({currentImage:0})
      this.setState({isOpen:false})
      this.props.setShowMenu();
    };
  date=format(new Date(this.props.day.date), 'dd/MM/yy')


  deleteDay(){
   
      axios.delete(Config.getServerPath()+'photo/'+this.props.day._id)
      .then(res => {
  if(res.data.status===404){
  return
  }
  this.props.updateGalleryEvent(res.data.day)
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
   
 

      render() {
        if(this.state.edit)
        return <Redirect to={{pathname:'/NewGalleryEvent' ,update:true, date:this.props.day.date}} />;
     if(this.state.delete) return '';
    return (
      
    <div  className='gallery-event'>
     <button className='gallery-btn' onClick={this.handleClick}>{this.date}</button>
      <button hidden={(isAuth().type!='0'&&isAuth().type!='2')} onClick={this.deleteDay} className='delete-gallery-btn'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button>

     {this.state.toggle?(<>
     <div className='gallery-details'>
       {/* <div style={{ position:'relative'}}> */}

      { this.props.day.photos.map((item,index)=>{
          return  <Event key={index} openImageViewer={()=>this.openImageViewer(index)} event={item.url} eventId={item._id}big={false} day={this.props.day} updateGalleryEvent={this.props.updateGalleryEvent} />

        })}
          </div>
       {this.state.isOpen && (
        <MyImageViewer
        images={ this.state.viewerImage }
          currentIndex={ this.state.currentImage }
          onClose={ this.closeImageViewer }
          date={this.date}
       
        />
      )}
 <button hidden={(isAuth().type!='0'&&isAuth().type!='2')} onClick={()=>this.setState({edit:true})} className='add-to-event-gallery'><span id='plus-menu' class="iconify" data-icon="bi:plus-lg" data-inline="false" ></span>הוסף </button>

       {/* </div> */}
       </>

   ):''}


    </div>

    );
  }
}
