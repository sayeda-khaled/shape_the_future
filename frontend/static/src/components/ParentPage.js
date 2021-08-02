import {Component} from 'react';

import {format} from 'date-fns';

class ParentPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    }

  }

  componentDidMount() {
    fetch('/api/v1/events/parent/').then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => this.setState({events: data})).catch(error => {
      console.error('There has been a problem with youor fetch operation:', error);

    });
  }

  render() {

    const events = this.state.events.map((event, index) => {
      const dateTimeStart = new Date(`${event.date_of_event} ${event.start_of_event}`);
      const dateTimeEnd = new Date(`${event.date_of_event} ${event.end_of_event}`);

      // to format date only (does not include time in format)
      let formattedDate = format(dateTimeStart, 'MMMM dd, yyyy');

      // to format start and end times (does not include date in format)
      const formattedStartTime = format(dateTimeStart, 'hh:mm aaaa');
      const formattedEndTime = format(dateTimeEnd, 'hh:mm aaaa');

      return (<div key={index}>
        <form className="form-1 bg-purple-100 m-6 p-4 rounded-3xl m-auto max-w-md mt-6 transform hover:scale-105 shadow-2xl-dark">

          <div className="flex items-baselin">
            <label className="text-gray-500 text-sm">Student Name</label>
            <p className="pb-3">{`${event.student_last_name}, ${event.student_first_name}`}</p>
          </div>
          <div className="flex items-baselin">
            <label className="text-gray-500 block text-sm">Grade:</label>
            <p className="pb-3" name="grade">{event.grade}</p>
          </div>
          <div className="flex items-baselin">
            <label className="text-gray-500 block text-sm">Event Date:</label>
            <time className="pb-3" rows="3">{formattedDate}</time>
          </div>
          <div className="flex items-baselin">
            <label className="text-gray-500 block text-sm">From:</label>
            <time className="pb-3" rows="3">{formattedStartTime} </time>
            <label className="text-gray-500 block text-sm">To:</label>
            <time className="pb-3" rows="3">{formattedEndTime}</time>
          </div>
          <div className="flex items-baselin">
            <label className="text-gray-500 block text-sm">Memo:</label>
            <p className="pb-3" name="memo">{event.memo}</p>
          </div>
        </form>

      </div>)
    });

    return (<ul>{events}</ul>)
  }
}

export default ParentPage;
