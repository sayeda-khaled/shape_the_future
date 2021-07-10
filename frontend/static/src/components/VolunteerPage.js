import { Component } from 'react';

import Cookies from 'js-cookie';


class VolunteerPage extends Component {

  constructor(props) {
    super(props);
    this.state={
      events: [],

      }
  this.cancelEvent = this.cancelEvent.bind(this);

    }

    componentDidMount(){
      fetch('/api/v1/events/volunteer/')
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


      cancelEvent(e, event) {
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
          fetch(`/api/v1/events/volunteer/${id}/`, options)
            .then(response => {
              if(!response.ok) {
                throw new Error('Network response was not ok');
              }
              const events = [...this.state.events];
              // console.log(events);
              const index = events.findIndex(event => event.id === id);
              // events[index].volunteer = true;
              this.setState({ events });
            });

          }
        // const options= {
        //   method: 'PUT',
        //   headers: {
        //   'Content-Type': 'application/json',
        //   'X-CSRFToken': Cookies.get('csrftoken'),
        //   },
        // }
        // fetch(`/api/v1/events/volunteer/${id}/`, options)
        //   .then(response => {
        //     if (!response.ok) {
        //       throw new Error('Network response was not ok');
        //     }
        //     const events = [...this.state.events];
        //
        //     const index = events.findIndex(event => event.id === event.id);
        //     events[index].volunteer = true;
        //     this.setState({ events });
        //   })
        //   .catch((error) => {
        //     console.error('Error:', error);
        //   });
        // }



        // <Moment format="1976-04-19T12:59-0500">{event.date}</Moment>
    render() {
      const events = this.state.events.map((event, index)=> (
        <div key = {index}>

          <section >
              <form onSubmit={(e) => this.signUp(e, event)} className="form-1 bg-purple-100 m-6 p-4 rounded-3xl m-auto block max-w-md mt-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label text-gray-500 block text-sm mr-2">Grade:</label>
                  <p class="form-control pb-3" id="exampleFormControlInput1" name="grade">{event.grade} </p>


                  <label for="exampleFormControlTextarea1" class="form-label text-gray-500 block text-sm mr-2">Event Date:</label>
                  <time class="form-control pb-3" id="exampleFormControlInput1" rows="3">{event.date_of_event}</time>

                <div class="btn-signup bg-blue pb-2"type ='button' onClick={(e) => this.cancelEvent(e,event)}>Sign Up</div>
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


export default VolunteerPage;
