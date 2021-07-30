import { Component } from 'react';
import AdminPageDetail from './AdminPageDetail.js';

import Cookies from 'js-cookie';
import { format } from 'date-fns';



class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      events: [],
      students: [],
      grade: '',
      date: '',
      startTime: '',
      endTime: '',
    }
    this.addEvent = this.addEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.assignStudent = this.assignStudent.bind(this);
  }


    componentDidMount(){
      Promise.all([fetch('/api/v1/events/staff/'), fetch('/api/v1/students/')])
      .then(responses => {
        return Promise.all(responses.map(function (response) {
      		return response.json();
      	}));
      })
      .then(data => {
        const [events, students] = data;
        this.setState({events, students});
      });
    }


    handleInput(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    addEvent(e) {
      e.preventDefault();
      const event = {
        grade: this.state.grade,
        date_of_event: this.state.date,
        start_of_event: this.state.startTime,
        end_of_event: this.state.endTime,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(event),
        }
      fetch('/api/v1/events/staff/', options)
        .then(response => response.json())
        .then(data => {
          const events = [...this.state.events, data];
          // events.push(data);
          this.setState({
            events,
            grade: '',
            date: '',
            startTime: '',
            endTime: '',
          });
        });
    }

    editEvent(event) {

      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(event),
      }
      fetch(`/api/v1/events/staff/${event.id}/`, options)
        .then(response => {
          if(!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const events = [...this.state.events];
          const index = events.findIndex(event => event.id === data.id);
          events[index] = data;
          this.setState({ events });
        });
      }

      deleteEvent(e, id) {
        e.preventDefault();
        const options= {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
          },
        }
        fetch(`/api/v1/events/staff/${id}/`, options)
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

      assignStudent(eventID, studentID) {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: JSON.stringify({student: studentID}),
        }
        fetch(`/api/v1/events/staff/${eventID}/`, options)
          .then(response => {
            if(!response.ok) {
              throw new Error('Network response was not ok');
            }
            const events = [...this.state.events];
            const index = events.findIndex(event => event.id === eventID);
            events[index].student = studentID;
            this.setState({ events });
          });
    }

    render() {
      const events = this.state.events.map(event => (
        <AdminPageDetail key={event.id} event={event} deleteEvent={this.deleteEvent} editEvent={this.editEvent} students={this.state.students} assignStudent={this.assignStudent}/>
      ));


      return (
        <>

          <main className="events-container md:flex bg-opacity-20">
                <ul className="w-5/12 ml-12">{events}</ul>

                <section className="form-container-1 sticky" style={{top:3+"VH"}}>
                    <form className="form-1" onSubmit={this.addEvent}>
                      <div className="mb-3">
                        <label  className="form-label block">Grade</label>
                        <input type="number" min="1" max="5" autoComplete="off" name="grade" value={this.state.grade} onChange={this.handleInput} placeholder="Insert the grade" className="input-1 border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                        </div>

                      <div className="mb-3">
                        <label className="form-label block">Event Date</label>
                        <input type="date"  min="2021-7-07" max="2021-12-31" name="date" id="start" autoComplete="off"  value={this.state.date} onChange={this.handleInput} rows="3" required className="input-1 border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                      </div>

                      <div className="mb-3">
                        <label  className="form-label block">Start Time</label>
                        <input type="time" name="startTime"  min="08:00" max="15:00" required autoComplete="off"  value={this.state.startTime} onChange={this.handleInput} rows="3" className="input-1 border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                      </div>


                      <div className="mb-3">
                        <label  className="form-label block">End Time</label>
                        <input type="time" name="endTime"  min="08:00" max="15:00" required autoComplete="off"  value={this.state.endTime} onChange={this.handleInput} rows="3"  className="input-1 border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                      </div>

                  <button type="button" onClick={this.addEvent} className="btn-submit-events transform hover:scale-105 font-extrabold">Submit</button>

                </form>
              </section>
            </main>
        </>
        )
      }
    }

    export default AdminPage;
