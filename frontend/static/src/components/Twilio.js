import { Component } from 'react';

import twilio from './../assets/images/twilio.jpeg';

class Twilio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,

    }
  }

      render() {

        return (
          <>
            <button id="twilio-about"
              className="bg-purple-200 text-gray-600 ml-10 rounded-full text-white active:bg-pink-600 pr-2 pl-2 mb-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => this.setState({showModal: true})}
            >
               Find Information About SMS Reminders
            </button>
            {this.state.showModal
              ? (
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
                          <div className="flex items-center rounded-b">

                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-2 py-1 text-base outline-none focus:outline-none ml-20 mb-1 pt-2 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => this.setState({showModal: false})}
                            >
                              Close
                            </button>

                          </div>
                        </div>
                  </>
            )
            : null}
          </>
        );
      }

}

export default Twilio;
