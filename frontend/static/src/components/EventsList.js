import { Component } from 'react';

import Cookies from 'js-cookie';


class EventsList extends Component {

  constructor(props) {
    super(props);
    this.state={
      events: [],
      selection: null,
      grade: null,
      date: null
      }
    this.handleInput = this.handleInput.bind(this);
    this.signUp = this.signUp.bind(this);
    }

    // componentDidMount(){
    //   fetch('/api/v1/events/')
    //   .then(response => response.json())
    //   .then(data => console.log(data));
    //   }



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

      signUp(e) {
        // e.preventDefault();
        const event = {
          grade: this.state.grade,
          date: this.state.date,
          // volunteer: this.state.volunteer
        };
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
            this.setState({events, grade: '', date: '', selection: null});
          });
      }


        // <Moment format="1976-04-19T12:59-0500">{event.date}</Moment>
    // render() {
    //   const events = this.state.events.map((event, index)=> (
    //     <div key = {index}>
    //         <h2>{event.grade}</h2>
    //         <time>{event.date_of_event}</time>
    //         <button className ="settingButtons" type ='button' onClick={() => this.signUp(event.id)}>Sign Up</button>
    //     </div>
    //
    //   ));

      render() {
        const events = this.state.events.map((event, index)=> (
          <div key = {index}>

            <section >
                <form className="list">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Grade</label>
                    <p class="form-control" id="exampleFormControlInput1" name="grade">{event.grade} </p>


                    <label for="exampleFormControlTextarea1" class="form-label">Event Date</label>
                    <time class="form-control" id="exampleFormControlInput1" rows="3">{event.date_of_event}</time>

                  <button id="signUp" class="btn btn-primary offset"type ='button' onClick={() => this.signUp(event.id)}>Sign Up</button>
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
