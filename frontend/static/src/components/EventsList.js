import { Component } from 'react';

import Cookies from 'js-cookie';
import { format, parseISO, formatISO } from 'date-fns';

import Modal from './Modal';


class EventsList extends Component {

  constructor(props) {
    super(props);
    this.state={
      events: [],
      grade: null,
      date: null
      }
    this.handleInput = this.handleInput.bind(this);
    this.signUp = this.signUp.bind(this);
    // this.submitEvent = this.submitEvent.bind(this);
    }

    componentDidMount(){
      fetch('/api/v1/events/')
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => this.setState({ events: data  }))
      .catch(error => {
        console.error('There has been a problem with youor fetch operation:', error);
      });
    }

      handleInput(event) {
        this.setState({ [event.target.name]: event.target.value });
      }

    signUp(e, event) {
      e.preventDefault();

      const id = event.id;

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(event),
      }
      fetch(`/api/v1/events/${id}/`, options)
        .then(response => {
          if(!response.ok) {
            throw new Error('Network response was not ok');
          }
          const events = [...this.state.events];
          // console.log(events);
          const index = events.findIndex(event => event.id === id);
          events[index].volunteer = false;
          this.setState({ events });
          alert("Thank you for signing up")
        });

      }

      //
      // const date = new Date("2021-07-21").toISOString()
      // let formattedDate = format(parseISO(date), 'MMMM dd, yyyy');

      //
      // function formattedTime(seconds) {
      //   var helperDate = dateFns.addSeconds(new Date(0), seconds);
      //   return dateFns.format(helperDate, 'mm:ss');
      // }

      // let formattedTime = getTimeFormat(event.start_of_event);

    // let startTime = event.start_of_event;
    // if(parseInt(startTime.slice(0,2)) > 12)

      render() {

        const events = this.state.events.map((event, index)=> {
          const dt = new Date(event.date_of_event);
          const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
          let formattedDate = format(dtDateOnly, 'MMMM dd, yyyy')

          let startTime = event.start_of_event.slice(0,-3);
          let startHour = parseInt(startTime.slice(0,2));

          let startMeridiem = 'a.m.';
          let endMeridiem = 'a.m.';

          if(startHour >= 12) {
            startMeridiem = 'p.m.';
            startHour = startHour - 12;
            startHour = ('0' + startHour.toString()).slice(-2);
            startTime = startHour + startTime.slice(2);
          }

          let endTime = event.end_of_event.slice(0, -3);
          let endHour = parseInt(endTime.slice(0,2));

          if(endHour > 12) {
            endMeridiem = 'p.m.';
            endHour = endHour - 12;
            endHour = ('0' + endHour.toString()).slice(-2);
            endTime = endHour + endTime.slice(2);
          }

          // startTime.splice(0, 2, hours);
          // console.log('hours', hours)


          return (
            <div key = {index}>

              <section className="pt-2" >
                  <form onSubmit={(e) => this.signUp(e, event)} className="form-1 bg-purple-100 m-6 p-4 rounded-3xl m-auto block max-w-md mt-6 transform hover:scale-105 shadow-2xl-dark">
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label text-gray-500 block text-sm">Grade:</label>
                        <p className="form-control pb-3" id="exampleFormControlInput1" name="grade">{event.grade} </p>


                        <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">Event Date:</label>
                        <time className="form-control pb-3" id="exampleFormControlInput1" name="date_of_event">{formattedDate}</time>

                        <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">From:</label>
                        <time className="form-control pb-3" id="exampleFormControlInput1">{startTime}  {startMeridiem}</time>

                        <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">To:</label>
                        <time className="form-control pb-3" id="exampleFormControlInput1">{endTime} {endMeridiem}</time>


                    <div className="btn-signup pb-2 transform hover:scale-105"type ='button' onClick={(e) => this.signUp(e, event)}>Sign Up</div>
                </div>
            </form>
            </section>


            </div>
          )
        });

      return (

          <ul>{events}</ul>

        )
      }
    }


export default EventsList;
