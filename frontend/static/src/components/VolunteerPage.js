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


  // handleMemoInput(e, memoEvent) {
  //   const events = [...this.state.events]
  //   const memoEventId = events.indexOf(memoEvent)
  //   events[memoEventId].memo = e.target.value
  //   this.setState(events)
  // }

  handleInput(e, event) {
    const events = [...this.state.events];
    const index = events.indexOf(event);
    events[index].memo = e.target.value;
    // memo.push(event);
    this.setState({events});
    this.setState({ memo: '' });
    // this.setState({
    //   [event.target.name]: event.target.value
    // });
  }

  saveMemo(event) {
    // console.log(event)
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
      // console.log(events);
      const index = events.findIndex(event => event.id === id);
      events[index].volunteer = null;
      this.setState({events});
      alert('Your session has been canceled!')
    });

  }

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
              <time className="form-control pb-3" rows="3">{startTime}  {startMeridiem}</time>

              <label for="exampleFormControlTextarea1" className="form-label mr-4 text-gray-500 block text-sm">To:</label>
              <time className="form-control pb-3" rows="3">{endTime} {endMeridiem}</time>


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

// <input type="text" name="memo" autoComplete="off" value={event.memo} onChange={(e) => this.handleInput(e, event)} className="form-control"/>
// <button  type='button' onClick={(e) => this.saveMemo(e, event)} className="btn-signup bg-blue pb-2 transform hover:scale-105">Save</button>
