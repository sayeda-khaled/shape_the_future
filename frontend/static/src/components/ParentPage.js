import {Component} from 'react';

import Cookies from 'js-cookie';

import { format } from 'date-fns';

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
              <time className="pb-3" rows="3">{startTime}  {startMeridiem}</time>
              <label className="text-gray-500 block text-sm">To:</label>
              <time className="pb-3" rows="3">{endTime} {endMeridiem}</time>
            </div>
            <div className="flex items-baselin">
              <label className="text-gray-500 block text-sm">Memo:</label>
              <p className="pb-3" name="memo">{event.memo}</p>
            </div>
          </form>

        </div>)});

        return (<ul>{events}</ul>)
      }
    }
//
//   render() {
//     const events = this.state.events.map((event, index) => (<div key={index}>
//
//       <form className="form-1 bg-purple-100 m-6 p-4 rounded-3xl m-auto max-w-md mt-6 transform hover:scale-105 shadow-2xl-dark">
//
//         <div className="flex items-baselin">
//           <label className="text-gray-500 text-sm">Student Name</label>
//           <p className="pb-3">{`${event.student_last_name}, ${event.student_first_name}`}</p>
//         </div>
//         <div className="flex items-baselin">
//           <label className="text-gray-500 block text-sm">Grade:</label>
//           <p className="pb-3" name="grade">{event.grade}</p>
//         </div>
//         <div className="flex items-baselin">
//           <label className="text-gray-500 block text-sm">Event Date:</label>
//           <time className="pb-3" rows="3">{event.date_of_event}</time>
//         </div>
//         <div className="flex items-baselin">
//           <label className="text-gray-500 block text-sm">From:</label>
//           <time className="pb-3" rows="3">{event.start_of_event}</time>
//           <label className="text-gray-500 block text-sm">To:</label>
//           <time className="pb-3" rows="3">{event.end_of_event}</time>
//         </div>
//         <div className="flex items-baselin">
//           <label className="text-gray-500 block text-sm">Memo:</label>
//           <p className="pb-3" name="memo">{event.memo}</p>
//         </div>
//       </form>
//
//     </div>));
//
//     return (<ul>{events}</ul>)
//   }
// }

export default ParentPage;
