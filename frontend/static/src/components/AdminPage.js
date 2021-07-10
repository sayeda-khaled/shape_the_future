import { Component } from 'react';
import AdminPageDetail from './AdminPageDetail.js';

import Cookies from 'js-cookie';


class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      events: [],
      students: [],
      grade: null,
      date: null
    }
    this.addEvent = this.addEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleInput = this.handleInput.bind(this);
    // this.getEvents = this.getEvents.bind(this);

  }


    // if the user is authenticated pull their events otherwise pull published events

    componentDidMount(){
      Promise.all([fetch('/api/v1/events/'), fetch('/api/v1/students/')])
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



    //
    // getEvents(){
    //   fetch('/api/v1/events/')
    //   .then(response => {
    //     if(!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => this.setState({ events: data  }))
    //   .catch(error => {
    //     console.error('There has been a problem with youor fetch operation:', error);
    //   });
    // }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addEvent(e) {
    e.preventDefault();
    const event = {
      grade: this.state.grade,
      date_of_event: this.state.date, //This is the key at the backend..
      // volunteer: this.state.volunteer

    };
    console.log(event);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(event),
    }
    fetch('/api/v1/events/', options)
      .then(response => response.json())
      .then(data => {
        const events = [...this.state.events, data];
        // events.push(data);
        this.setState({events, grade: '', date: ''});
      });
  }

    editEvent(event) {


      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(event),
      }
      fetch(`/api/v1/events/${event.id}/`, options)
        .then(response => {
          if(!response.ok) {
            throw new Error('Network response was not ok');
          }
          const events = [...this.state.events];
          console.log(events);
          const index = events.findIndex(event => event.id === event.id);
          events[index].grade = event.grade;
          events[index].date = event.date;
          this.setState({ events });
          // this.getEvents();
        });
      }

      deleteEvent(id) {
        const options= {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
          },
        }
        fetch(`/api/v1/events/${id}/`, options)
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

    render() {
      const events = this.state.events.map(event => (
        <AdminPageDetail key={event.id} event={event} deleteEvent={this.deleteEvent} editEvent={this.editEvent} />
      ));

  //     const students = this.state.students.map(student => (
  //       <div className="students" key={student.id} student={student}>
  //     <label for="student-select" name="students">Choose a student:</label>
  //
  //       <select name="student" id="student-select">
  //     <option value="{this.state.student.first_name}">--Please choose an option--</option>
  //
  // </select>
  //
  //       </div>
  //     ));


      return (
        <>
          <ul>{events}</ul>
            <section className="submit">
                <form onSubmit={this.addEvent}>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Grade</label>
                    <input type="number" min="1" max="5" class="form-control" id="exampleFormControlInput1" autoComplete="off" name="grade" value={this.state.grade} onChange={this.handleInput} placeholder="Insert the grade"/>
                    </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Event Date</label>
                    <input type="datetime-local" name="date" id="datetime" class="form-control" autoComplete="off" id="exampleFormControlInput1"  value={this.state.date_of_event} onChange={this.handleInput} rows="3"/>
                  </div>
              <button type="submit" onClick={this.addevent} class="btn btn-primary offset">Submit</button>
            </form>
          </section>

        </>
        )
      }

    }

    export default AdminPage;
