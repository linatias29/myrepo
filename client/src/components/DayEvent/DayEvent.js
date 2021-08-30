import React, { Component } from 'react';
import './DayEvent.css';
import { Redirect } from "react-router-dom";
import Config from '../../config/config';
import axios from 'axios';
import Event from '../NewDayEvent/Event';
import { format } from 'date-fns';
import { isAuth } from '../../actions/auth';


export default class DayEvent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      event: [],
      add: false,


    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteDay = this.deleteDay.bind(this);



  }
 
  date = format(new Date(this.props.day.date), 'dd/MM/yy')


  deleteDay() {

    axios.delete(Config.getServerPath() + 'event/' + this.props.day._id)
      .then(res => {
        if (res.data.status === 404) {
          return
        }
        this.setState({ delete: true })
        this.props.updateDayEvent(res.data.day)

      })
      .catch(() => { });
    console.log('deleteDay')
  }
  handleClick = (event) => {
    this.setState({ toggle: !this.state.toggle })
  };

  handleChangeSelect(event) {
    if (event.target.value == this.props.user.type)
      this.setState({ saveButoon: false });
    else this.setState({ saveButoon: true });

    this.setState({ userType: event.target.value });


  }


  updateUser() {

    const postData = {
      type: this.state.userType.trim(),

    };
    axios.post(Config.getServerPath() + 'user/' + this.props.user._id, postData)
      .then(res => {
        if (res.data.status === 'faild') {
          return
        }
        this.setState({ saveButoon: false });

        // this.props.setUser(res.data.user)

      })
      .catch(() => { });
    console.log('update user')
  }

  render() {
    if (this.state.add)
      return <Redirect to={{ pathname: '/NewDayEvent', update: true, date: this.props.day.date }} />;;
    if (this.state.delete) return '';
    return (

      <div className='day-event'>
        <button className='day-btn' onClick={this.handleClick}>{this.date}</button>
        <button  hidden={(isAuth().type != '0' && isAuth().type != '4')} onClick={this.deleteDay} className='delete-event'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button> 

        {this.state.toggle ? (<div className='event-details-d'>
          {/* <div style={{ position:'relative'}}> */}

          {this.props.day.events.map((item, index) => {
            return <Event key={index} event={item} big={false} day={this.props.day} updateDayEvent={this.props.updateDayEvent}/>

          })}


          {/* </div> */}
          <button hidden={(isAuth().type != '0' && isAuth().type != '4')} onClick={() => this.setState({ add: true })} className='add-to-event-day-e'><span id='plus-menu' class="iconify" data-icon="bi:plus-lg" data-inline="false" ></span>הוסף </button>

        </div>) : ''}


      </div>

    );
  }
}
