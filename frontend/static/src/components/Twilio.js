import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import twilio from './../assets/images/twilio.jpeg';




class Twilio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,

    }

  }
  // <p id="story" name="memo" className="">This is a test</p>
  // <img className="twilio-image" src={background} alt=""/>


      render() {


        return (
          <>
            <button id="twilio-about"
              className="bg-indigo-600 ml-14 rounded-full text-white active:bg-pink-600 pr-2 pl-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => this.setState({showModal: true})}
            >
               Find More About SMS Reminders
            </button>
            {this.state.showModal ? (
              <>
                <div
                  className=" inline-grid bg-gray-100 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">

                      </div>
                      {/*body*/}
                      <div className="relative flex-auto">
                        <p className="pb-4 font-semibold text-indigo-800"><span>We will send you notifications a day</span> <span>before your session is scheduled</span></p>
                    <img className="twilio-image" src={twilio} alt=""/>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center  rounded-b">





                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-2 py-1 text-sm outline-none focus:outline-none ml-20 mb-1 pt-2 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => this.setState({showModal: false})}
                        >
                          Close
                        </button>

                      </div>
                    </div>


              </>
            ) : null}
          </>
        );
      }


}

export default Twilio;






// class Twilio extends Component{
//
//   render(){
//     return(
//       <div id="twilio-container">
//       <img src={background} alt=""/>
//
//       </div>
//     )
//   }
// }
// export default Twilio;
//
//
// import React, { Component } from "react";
