import { Component } from 'react';

import Cookies from 'js-cookie';


class VolunteerPage extends Component {

  constructor(props) {
    super(props);
    this.state={
      events: [],
      memo: '',
      }
  this.cancelEvent = this.cancelEvent.bind(this);
  this.handleMemoInput = this.handleMemoInput.bind(this);

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


      handleMemoInput(e, memoEvent) {
        const events = [...this.state.events]
        const memoEventId = events.indexOf(memoEvent)
        events[memoEventId].memo = e.target.value
        this.setState(events)
      }

      cancelEvent(e, event) {
        e.preventDefault();
        const id = event.id;

        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: JSON.stringify({ volunteer: null }),
        }
        fetch(`/api/v1/events/volunteer/${id}/`, options)
          .then(response => {
            if(!response.ok) {
              throw new Error('Network response was not ok');
            }
            const events = [...this.state.events];
            // console.log(events);
            const index = events.findIndex(event => event.id === id);
            events[index].volunteer = null;
            this.setState({ events });
            alert('Your session has been canceled!')
          });

        }


    render() {
      const events = this.state.events.map((event, index)=> (
        <div key = {index}>

          <section >
              <form  className="form-1 bg-purple-100 m-6 p-4 rounded-3xl m-auto block max-w-md mt-6">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label text-gray-500 block text-sm mr-2">Grade:</label>
                    <p class="form-control pb-3" id="exampleFormControlInput1" name="grade">{event.grade} </p>


                    <label for="exampleFormControlTextarea1" class="form-label text-gray-500 block text-sm mr-2">Event Date:</label>
                    <time class="form-control pb-3" id="exampleFormControlInput1" rows="3">{event.date_of_event}</time>


                    <label for="exampleFormControlTextarea1" class="form-label text-gray-500 block text-sm mr-2">From:</label>
                    <time class="form-control pb-3" id="exampleFormControlInput1" rows="3">{event.start_of_event}</time>

                    <label for="exampleFormControlTextarea1" class="form-label text-gray-500 block text-sm mr-2">To:</label>
                    <time class="form-control pb-3" id="exampleFormControlInput1" rows="3">{event.end_of_event}</time>
                <div class="btn-signup bg-blue pb-2"type ='button' onClick={(e) => this.cancelEvent(e,event)}>Cancel</div>

                </div>
                {event.student
                  ?<input type="text" name="memo" class="form-control" autoComplete="off" id="exampleFormControlInput1"  value={event.memo} onChange={(e) => this.handleMemoInput(e, event)} rows="3"/>
                  :<p>Awaiting Student Assignment</p>


                }





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
