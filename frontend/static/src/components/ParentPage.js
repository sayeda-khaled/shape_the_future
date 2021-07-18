import { Component } from 'react';

import Cookies from 'js-cookie';


class ParentPage extends Component {

  constructor(props) {
    super(props);
    this.state={
      events: [],

      }

    }

  componentDidMount(){
    fetch('/api/v1/students/parents/')
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


  render() {
    const events = this.state.events.map((event, index)=> (
      <div key = {index}>

        <section >
            <form  className="form-1 bg-purple-100 m-6 p-4 rounded-3xl m-auto block max-w-md mt-6">
              <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label text-gray-500 block text-sm">Grade:</label>
                  <p class="form-control pb-3" id="exampleFormControlInput1" name="grade">{event.grade} </p>
              </div>

                  <label for="exampleFormControlTextarea1" class="form-label text-gray-500 block text-sm">Event Date:</label>
                  <time class="form-control pb-3" id="exampleFormControlInput1" rows="3">{event.date_of_event}</time>


                  <label for="exampleFormControlTextarea1" class="form-label text-gray-500 block text-sm">From:</label>
                  <time class="form-control pb-3" id="exampleFormControlInput1" rows="3">{event.start_of_event}</time>

                  <label for="exampleFormControlTextarea1" class="form-label text-gray-500 block text-sm">To:</label>
                  <time class="form-control pb-3" id="exampleFormControlInput1" rows="3">{event.end_of_event}</time>

                  <label for="exampleFormControlInput1" class="form-label text-gray-500 block text-sm">Grade:</label>
                  <p class="form-control pb-3" id="exampleFormControlInput1" name="memo">{event.memo} </p>



      </form>
      </section>

      </div>

    ));

    return (

        <ul>{events}</ul>

      )
    }
  }


export default ParentPage;
