import { Component } from 'react';

import Cookies from 'js-cookie';


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

      render() {

        const events = this.state.events.map((event, index)=> (
          <div key = {index}>

            <section >
                <form onSubmit={(e) => this.signUp(e, event)} className="form-1 bg-purple-100 m-6 p-4 rounded-3xl m-auto block max-w-md mt-20 transform hover:scale-105 shadow-2xl-dark">
                  <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label text-gray-500 block text-sm">Grade:</label>
                      <p className="form-control pb-3" id="exampleFormControlInput1" name="grade">{event.grade} </p>


                      <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">Event Date:</label>
                      <time className="form-control pb-3" id="exampleFormControlInput1" rows="3">{event.date_of_event}</time>

                      <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">From:</label>
                      <time className="form-control pb-3" id="exampleFormControlInput1" rows="3">{event.start_of_event}</time>

                      <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">To::</label>
                      <time className="form-control pb-3" id="exampleFormControlInput1" rows="3">{event.end_of_event}</time>


                  <div className="btn-signup pb-2 transform hover:scale-105"type ='button' onClick={(e) => this.signUp(e, event)}>Sign Up</div>
              </div>
          </form>
          </section>


          </div>


        ));

      return (

          <ul>{events}</ul>

        )
      }
    }


export default EventsList;
