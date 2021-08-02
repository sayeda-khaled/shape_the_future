import {Component} from 'react';

import Cookies from 'js-cookie';
import { format } from 'date-fns';

import Modal from './Modal';


class VolunteerPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      memo: "",
    }
    this.cancelEvent = this.cancelEvent.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.saveMemo = this.saveMemo.bind(this);

  }

  componentDidMount() {
    fetch('/api/v1/events/volunteer/').then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => this.setState({events: data})).catch(error => {
      console.error('There has been a problem with youor fetch operation:', error);
    });
  }


  handleInput(e, event) {
    const events = [...this.state.events];
    const index = events.indexOf(event);
    events[index].memo = e.target.value;
    this.setState({events});
    this.setState({ memo: '' });
  }

  saveMemo(event) {
    const id = event.id;

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(event)
    }
    fetch(`/api/v1/events/volunteer/${id}/`, options).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Memo added successfully!');

    });
  }

  cancelEvent(e, event) {
    e.preventDefault();
    const id = event.id;

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify({volunteer: null})
    }
    fetch(`/api/v1/events/volunteer/${id}/`, options).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const events = [...this.state.events];
      const index = events.findIndex(event => event.id === id);
      events[index].volunteer = null;
      this.setState({events});
      alert('Your session has been canceled!')
    });

  }

  render() {

    const events = this.state.events.map((event, index)=> {
      const dateTimeStart = new Date(`${event.date_of_event} ${event.start_of_event}`);
      const dateTimeEnd = new Date(`${event.date_of_event} ${event.end_of_event}`);

      // to format date only (does not include time in format)
      let formattedDate = format(dateTimeStart, 'MMMM dd, yyyy');

      // to format start and end times (does not include date in format)
      const formattedStartTime = format(dateTimeStart, 'hh:mm aaaa');
      const formattedEndTime = format(dateTimeEnd, 'hh:mm aaaa');


    return (
      <div key={index}>

        <section className="pt-2" >
          <form className="form-1 bg-purple-100 m-6 p-4 rounded-3xl m-auto block max-w-md mt-6 transform hover:scale-105 shadow-2xl-dark">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label text-gray-500 block text-sm">Grade:</label>
              <p className="form-control pb-3" name="grade">{event.grade}</p>

              <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">Event Date:</label>
              <time className="form-control pb-3" rows="3">{formattedDate}</time>

              <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">From:</label>
              <time className="form-control pb-3" rows="3">{formattedStartTime}</time>

              <label for="exampleFormControlTextarea1" className="form-label mr-4 text-gray-500 block text-sm">To:</label>
              <time className="form-control pb-3" rows="3">{formattedEndTime}</time>


              {
                event.student
                ?
                  <>
                    <Modal saveMemo={this.saveMemo} event={event}/>
                  </>

                :
                  <>
                  <button  type='button' onClick={(e) => this.cancelEvent(e, event)} className="btn-signup bg-blue pb-2 transform hover:scale-105">Cancel</button>
                  </>
              }
            </div>
          </form>
        </section>

      </div>
    )});

    return (

        <ul>{events}</ul>)
  }
}

export default VolunteerPage;
