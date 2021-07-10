import { Component } from 'react';


class AdminPageDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      grade: this.props.events?.grade,
      date: this.props.events?.date,
      // firstNmae: this.props.students?.firstName,
      // lastName: this.props.students?.lastName
    }
    this.handleInput = this.handleInput.bind(this);
    this.saveEvent = this.saveEvent.bind(this);

  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  saveEvent() {
    const event = this.props.event;
    event.grade = this.state.grade;
    event.date = this.state.date;
    // event.volunteer = this.state.volunteer;
    this.props.editEvent(event);
    this.setState({ isEditing: false });
  }

  // <input type="text" value={this.state.volunteer} onChange={this.handleInput} name="volunteer"/>

//   <label for="pet-select">Choose a pet:</label>
//
// <select name="students" id="student-select">
//     <option value="">--Please choose a student--</option>
//
//     <option value={students.first_name} name="firstName">First Name</option>
//     <option value="students.firstName">Last Name</option>
//
// </select>

  render() {
    const students = this.props.student;
    const events = this.props.event;
    return(
      <li className="bg-purple-100 m-6 p-4 rounded">
        <div>
            {
            this.state.isEditing
              ? (
                  <>
                    <input type="number" min="1" max="5" name="grade" value={this.state.grade} onChange={this.handleInput}/>
                    <input type="datetime-local" value={this.state.date} onChange={this.handleInput} name="date"/>
                  </>
                )
              : (
                  <>
                  <div className="flex items-center" >
                    <label className="text-gray-500 block text-sm mr-2">Grade:</label>
                    <h2 className="bg-white rounded-full py-2 px-4">{events.grade}</h2>
                    </div>
                      <label className="text-gray-500 block text-sm">Date:</label>
                    <time>{events.date_of_event}</time>
                      <label className="text-gray-500 block text-sm">Volunteer:</label>
                    <p>{events.volunteer}</p>
                  </>
                )
            }
            {
            <button class="btn-edit bg-blue" onClick={() => this.props.deleteEvent(events.id)}>delete</button>

            }
            {
            this.state.isEditing
              ? <button class="btn-editt bg-blue flex-col ml-2 mt-2" type='button' onClick={this.saveEvent}>Save</button>
              : <button class="btn-edit bg-blue flex-col ml-2 mt-2" onClick={() => this.setState({isEditing: true})}>Edit</button>
            }
        </div>
      </li>
    )
  }
}


export default AdminPageDetail;
