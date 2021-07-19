import {Component} from 'react';

import Cookies from 'js-cookie';

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

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  saveMemo(e, event) {
    e.preventDefault();
    const id = event.id
    const memo = {
      memo: this.state.memo
    }

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(event)
    }
    fetch(`/api/v1/events/volunteer/`, options).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const events = [...this.state.events]
      const index = events.findindexOf(event => event.id === id);
      events[index].memo = memo

      this.setState({events})
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
    const events = this.state.events.map((event, index) => (<div key={index}>

      <section >
        <form className="form-1 bg-purple-100 m-6 p-4 rounded-3xl m-auto block max-w-md mt-6 transform hover:scale-105 shadow-2xl-dark">
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label text-gray-500 block text-sm">Grade:</label>
            <p className="form-control pb-3" name="grade">{event.grade}</p>

            <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">Event Date:</label>
            <time className="form-control pb-3" rows="3">{event.date_of_event}</time>

            <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">From:</label>
            <time className="form-control pb-3" rows="3">{event.start_of_event}</time>

            <label for="exampleFormControlTextarea1" className="form-label text-gray-500 block text-sm">To:</label>
            <time className="form-control pb-3" rows="3">{event.end_of_event}</time>


            {
              event.student
              ?
                <>
                  <input type="text" name="memo" autoComplete="off" value={event.memo} onChange={this.handleInput} className="form-control"/>
                  <button  type='button' onClick={(e) => this.saveMemo(e, event)} className="btn-signup bg-blue pb-2 transform hover:scale-105">Save</button>
                </>

              :
                <>
                <button  type='button' onClick={(e) => this.cancelEvent(e, event)} className="btn-signup bg-blue pb-2 transform hover:scale-105">Cancel</button>
                 <p>Awaiting Student Assignment</p>
                </>
            }
          </div>
        </form>
      </section>

    </div>));

    return (<ul>{events}</ul>)
  }
}

export default VolunteerPage;
