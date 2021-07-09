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


      cancelEvent(id) {
        const options= {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
          },
        }
        fetch(`/api/v1/events/volunteer/${id}/`, options)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const events = [...this.state.events];
            const index = events.findIndex(event => events.id === id);
            events.splice(index, 1);
            this.setState({ events });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }



        // <Moment format="1976-04-19T12:59-0500">{event.date}</Moment>
    render() {
      const events = this.state.events.map((event, index)=> (
        <div key = {index}>
            <h2>{event.grade}</h2>
            <time>{event.date_of_event}</time>
            <button onClick={() => this.cancelEvent(events.id)}>Cancel</button>


        </div>

      ));

      return (

          <ul>{events}</ul>

        )
      }
    }


export default VolunteerPage;
