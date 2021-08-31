import React, { Component,Fragment } from 'react';
import './NewDayEvent.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import Event from './Event';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Config from '../../config/config';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { isAuth } from '../../actions/auth';
registerLocale('es', es)
export default class NewDayEvent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
  
      exit: false,
      childImage:'',



      startDate:new Date(),
      Events:[],
      add:false,
      startTime:'',
      startTimeE:false,

      endTime:'',
      endTimeE:false,

      discription:'',
      discriptionE:false,
      updateMode:false,
      timeUse:[],

    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeSelectStart = this.handleChangeSelectStart.bind(this);
    this.handleChangeSelectEnd= this.handleChangeSelectEnd.bind(this);

    this.addEvet = this.addEvet.bind(this);
    this.openNew = this.openNew.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.ClearError = this.ClearError.bind(this);



  }
  componentDidMount(){
    if(this.props.location.update){

      this.setState({updateMode:true})
      let date=this.props.location.date
      let d=new Date(date);
      this.setState({startDate:d})
    
   
    }
  }
  handleAddEvent(){

    const postData = {
      date: this.state.startDate,
      events: this.state.Events,
  };
    axios.post(Config.getServerPath()+'event',postData)
    .then(res => {
if(res.data.status===400){
  console.log('error')
return
}
console.log(res.data)
this.props.updateDayEvent(res.data.day);
this.setState({ exit: true });


    })
    .catch(() => {    console.log('send')
  }   );



  }
  ClearError(){

    this.setState({discriptionE:false})
    this.setState({startTimeE:false})
    this.setState({endTimeE:false})
 


  }
  addEvet() {
    this.ClearError();
    let error=false;

    if(this.state.discription==''){
      this.setState({discriptionE:true})
      error=true
      
    }
    if(this.state.startTime==''){
      this.setState({startTimeE:true})
      error=true
    }
    if(this.state.endTime==''){
      this.setState({endTimeE:true})
      error=true
    }

    if(error) return
    const item = this.state.Events;
    const discription = this.state.discription;
    const startTime = this.state.startTime;
    const endTime = this.state.endTime;

    item.push({ discription, startTime,endTime})
    item.sort((a,b)=>  a.startTime - b.startTime)
    const use=this.state.timeUse;
    // use.push(this.state.startTime)
    for( let i=this.state.startTime;i<this.state.endTime;i+=10)
    {
      use.push(i)
    }
    use.sort((a,b)=>a-b);
    this.setState({timeUse:use});
    this.setState({ Events: item })
    this.setState({discription:''})
    this.setState({startTime:''})
    this.setState({endTime:''})


  }
  
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ exit: true });

  };
  handleChangeSelectStart(event) {
    this.setState({ startTime: event.target.value });

  }
  handleChangeSelectEnd(event) {
    this.setState({ endTime: event.target.value });

  }
  openNew(){

    this.setState({add:!this.state.add});
  }


  render() {
    if(isAuth().type!=='0'&&isAuth().type!=='4')
    return <Redirect to={'/'}/>;
    if (this.state.exit)
    return <Redirect to={{pathname:'/DailyPlan'}} />;;

    return (

      <div className='new-day-event' dir="rtl">

        <h3 className='titel-new-event'><u>הוספת יום פעילות</u> </h3>
        <DatePicker disabled={this.state.updateMode}  id='date-piker'   dateFormat="dd/MM/yy" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} />
        <button  onClick={this.openNew} className='dayNew-add-btn'>הוסף אירוע חדש</button>
        {this.state.add?(
<div id='form-event-div'>
        <FormControl id='form-event' >

          <InputLabel id="child" htmlFor="child-name">תיאור</InputLabel>

          <Input aria-describedby="helper"  error={this.state.discriptionE} required type='text' id="child-name" value={this.state.discription} onChange={(e) => this.setState({ discription: e.target.value })} />
          {this.state.discriptionE?  <FormHelperText  error={this.state.discriptionE} id="helper">חסר תיאור</FormHelperText>:''}

        </FormControl>

        <br />
        <div style={{display:'flex'}}>
        <FormControl  variant="standard" id='select-time-start'>
        <InputLabel error={this.state.endTimeE} shrink id='child'>שעת סיום</InputLabel>

        <Select
        required
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
          value={this.state.endTime}
          onChange={this.handleChangeSelectEnd}
          displayEmpty
        >
<MenuItem id='val' disabled={this.state.startTime>=(10)||this.state.timeUse.includes(10)} value={10}>08:00</MenuItem>
          <MenuItem id='val' disabled={this.state.startTime>=(20)||(this.state.timeUse[0]<20&&this.state.timeUse[0]>this.state.startTime)} value={20}>09:00</MenuItem>
          <MenuItem id='val'disabled={this.state.startTime>=(30) ||(this.state.timeUse[0]<30&&this.state.timeUse[0]>this.state.startTime)}value={30}>10:00</MenuItem>
          <MenuItem id='val'disabled={this.state.startTime>=(40)||(this.state.timeUse[0]<40&&this.state.timeUse[0]>this.state.startTime)} value={40}>11:00</MenuItem>
          <MenuItem id='val'disabled={this.state.startTime>=(50)||(this.state.timeUse[0]<50&&this.state.timeUse[0]>this.state.startTime) }  value={50}>12:00</MenuItem>
          <MenuItem id='val'disabled={this.state.startTime>=(60)||(this.state.timeUse[0]<60&&this.state.timeUse[0]>this.state.startTime)} value={60}>13:00</MenuItem>
          <MenuItem id='val'disabled={this.state.startTime>=(70)||(this.state.timeUse[0]<70&&this.state.timeUse[0]>this.state.startTime)} value={70}>14:00</MenuItem>
          <MenuItem id='val'disabled={this.state.startTime>=(80)||(this.state.timeUse[0]<80&&this.state.timeUse[0]>this.state.startTime)} value={80}>15:00</MenuItem>
          <MenuItem id='val'disabled={this.state.startTime>=(90)||(this.state.timeUse[0]<90&&this.state.timeUse[0]>this.state.startTime)} value={90}>16:00</MenuItem>
          <MenuItem id='val'disabled={this.state.startTime>=(100)||(this.state.timeUse[0]<100&&this.state.timeUse[0]>this.state.startTime)} value={100}>17:00</MenuItem>
         

          
        </Select>
      </FormControl>
        <FormControl  variant="standard" id='select-time-end'>
        <InputLabel error={this.state.startTimeE} shrink id='child'>שעת התחלה</InputLabel>

        <Select
        required
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
          value={this.state.startTime}
          onChange={this.handleChangeSelectStart}
          displayEmpty
        >
      

       <MenuItem id='val'disabled={this.state.timeUse.includes(10)} value={10}>08:00</MenuItem>
          <MenuItem id='val'disabled={this.state.timeUse.includes(20)} value={20}>09:00</MenuItem>
          <MenuItem id='val'disabled={this.state.timeUse.includes(30)}value={30}>10:00</MenuItem>
          <MenuItem id='val'disabled={this.state.timeUse.includes(40)} value={40}>11:00</MenuItem>
          <MenuItem id='val'disabled={this.state.timeUse.includes(50)} value={50}>12:00</MenuItem>
          <MenuItem id='val'disabled={this.state.timeUse.includes(60)} value={60}>13:00</MenuItem>
          <MenuItem id='val'disabled={this.state.timeUse.includes(70)} value={70}>14:00</MenuItem>
          <MenuItem id='val'disabled={this.state.timeUse.includes(80)} value={80}>15:00</MenuItem>
          <MenuItem id='val'disabled={this.state.timeUse.includes(90)} value={90}>16:00</MenuItem>
          <MenuItem id='val'disabled={this.state.timeUse.includes(100)} value={100}>17:00</MenuItem>
          
        </Select>
      </FormControl>
      
      </div>
      <button onClick={this.addEvet} className='event-add-btn'>הוספה</button>
      </div>
      ):''}
        <br />
        { this.state.Events.map((item,index)=>{
          return  <Event key={index} event={item} big={true}/>

        })}
        <Button onClick={this.handleAddEvent} id='child-submit-event' >שליחה</Button>
        <Button onClick={this.handleClose} id='child-submit-event-cancel' >ביטול</Button>

      </div>

    );
  }
}
