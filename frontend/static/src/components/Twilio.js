import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import background from './../assets/images/background.jpg';


class Twilio extends Component{

  render(){
    return(
      <div id="twilio-container">
      <img src={background} alt=""/>

      </div>
    )
  }
}
export default Twilio;
