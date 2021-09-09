import React, { Component,Fragment } from 'react';
import './NewFoodMenuEvent.css';
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
registerLocale('es', es)
export default class NewFoodMenuEvent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
  
      exit: false,


      updateMode:false,
      startDate:new Date(),
      EventsBreakfast:[],
      EventsLunch:[],
      EventsAfternoon:[],

      add:false,
      menu:'',
      menuE:false,

      discription:'',
      discriptionE:false,

      menuUse:[],

    }

    this.handleClose = this.handleClose.bind(this);
    this.handleChangeSelectMenu = this.handleChangeSelectMenu.bind(this);

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

   
    let itemMenu=[];
    this.state.EventsBreakfast.map((item,index)=>{
      console.log(item)
      itemMenu.push(item);

    })
    this.state.EventsLunch.map((item,index)=>{
      itemMenu.push(item);

    })
    this.state.EventsAfternoon.map((item,index)=>{
      itemMenu.push(item);

    })
   

    console.log(itemMenu)

    const postData = {
      date: this.state.startDate,
      foods: itemMenu,
  };
    axios.post(Config.getServerPath()+'menu',postData)
    .then(res => {
if(res.data.status===400){
return
}
this.props.updateMenuEvent(res.data.day);

this.setState({ exit: true });


    })
    .catch(() => {    console.log('send')
  }   );



  }
  ClearError(){

    this.setState({discriptionE:false})
    this.setState({menuE:false})
 


  }
  addEvet() {
    this.ClearError();
    let error=false;

    if(this.state.discription==''){
      this.setState({discriptionE:true})
      error=true
      
    }
    if(this.state.menu==''){
      this.setState({menuE:true})
      error=true
    }
  

    if(error) return

    let item=[];
    if(this.state.menu==10)
     item = this.state.EventsBreakfast;
    if(this.state.menu==20)
     item = this.state.EventsLunch;

    if(this.state.menu==30)
     item = this.state.EventsAfternoon;

    const discription = this.state.discription;
    const category = this.state.menu;

    item.push({ discription, category})
    // use.push(this.state.startTime)
    if(this.state.menu==10)
    this.setState({ EventsBreakfast: item })
    if(this.state.menu==20)
    this.setState({ EventsLunch: item })

    if(this.state.menu==30)
    this.setState({ EventsAfternoon: item })

    this.setState({discription:''})
    this.setState({menu:''})


  }
  
 

  handleClose = () => {
    this.setState({ exit: true });

  };
  handleChangeSelectMenu(event) {
    this.setState({ menu: event.target.value });

  }
 
  openNew(){

    this.setState({add:!this.state.add});
  }


  render() {
    if(this.props.user.type!=='0'&&this.props.user.type!=='2')
    return <Redirect to={'/'}/>;
    if (this.state.exit)
      return <Redirect to={'/FoodMenu'} />;
    return (

      <div className='new-menu-event' dir="rtl">

        <h3 className='titel-new-event'><u>הוספת תפריט אוכל</u> </h3>
        <DatePicker disabled={this.state.updateMode} id='date-piker'   dateFormat="dd/MM/yy" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} />
        <button  onClick={this.openNew} className='menu-add-btn'>הוסף ארוחה </button>
        {this.state.add?(
<div id='form-event-div'>
        <FormControl id='form-event' >

          <InputLabel id="child" htmlFor="child-name">תיאור</InputLabel>

          <Input aria-describedby="helper"  error={this.state.discriptionE} required type='text' id="child-name" value={this.state.discription} onChange={(e) => this.setState({ discription: e.target.value })} />
          {this.state.discriptionE?  <FormHelperText  error={this.state.discriptionE} id="helper">חסר תיאור</FormHelperText>:''}

        </FormControl>

        <br />
        <div style={{display:'flex'}}>
       
        <FormControl  variant="standard" id='select-menu'>
        <InputLabel error={this.state.menuE} shrink id='child'> ארוחה</InputLabel>

        <Select
        required
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
          value={this.state.menu}
          onChange={this.handleChangeSelectMenu}
          displayEmpty
        >
      

       <MenuItem id='val'  value={10}>ארוחת בוקר</MenuItem>
       <MenuItem id='val' value={20}>ארוחת צהריים</MenuItem>
       <MenuItem id='val' value={30}>נשנוש אחר הצהריים</MenuItem>

          
        </Select>
      </FormControl>
      
      </div>
      <button onClick={this.addEvet} className='event-add-btn'>הוספה</button>
      </div>
      ):''}
        <br />
        <div className='menu-type'>
         {this.state.EventsBreakfast.length!=0?( <p className='menu-type-title'><u>  <span class="iconify" data-icon="whh:restaurantmenu" data-inline="false"></span>  ארוחת בוקר</u></p>):''}
        { this.state.EventsBreakfast.map((item,index)=>{
          return  <Event key={index} event={item} big={true}/>

        })}
        </div>
        <div className='menu-type'>
         {this.state.EventsLunch.length!=0?( <p className='menu-type-title'><u>   <span class="iconify" data-icon="whh:restaurantmenu" data-inline="false"></span>  ארוחת צהריים</u></p>):''}
            { this.state.EventsLunch.map((item,index)=>{
          return  <Event key={index} event={item} big={true}/>

        })}
        </div>
        <div className='menu-type'>
         {this.state.EventsAfternoon.length!=0?( <p className='menu-type-title'><u>  <span class="iconify" data-icon="whh:restaurantmenu" data-inline="false"></span>  ארוחת אחר הצהריים</u></p>):''}
            { this.state.EventsAfternoon.map((item,index)=>{
          return  <Event key={index} event={item} big={true}/>

        })}
      
      </div>
      <div className='child-submit-event-menu-div'>
        <Button onClick={this.handleAddEvent} id='child-submit-event-menu' >שליחה</Button>
        <Button onClick={this.handleClose} id='child-submit-event-cancel-menu' >ביטול</Button>
        </div>
      </div>

    );
  }
}
