import {Component} from 'react';

class AdminPageDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props.event,
      isEditing: false,
    }

    this.handleInput = this.handleInput.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.assignStudent = this.assignStudent.bind(this);

  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  saveEvent() {
    const event = this.props.event;
    event.grade = this.state.grade;
    event.date = this.state.date;
    // event.volunteer = this.state.volunteer;
    this.props.editEvent(event);
    this.setState({isEditing: false});
  }

  assignStudent(event) {
    const {id, student} = this.state;
    this.props.assignStudent(id, Number(student));
  }

  render() {
    const event = this.state;
    const students = this.props.student;
    const options = this.props.students.map(student => <option value={student.id} selected={event.student === student.id}>{`${student.last_name}, ${student.first_name}`}</option>)
    return (<li className="bg-purple-100 m-6 p-4 rounded w-80">
      <div className="flex items-center">
        <label className="text-gray-500 block text-sm mr-2">Grade:</label>
        <input type="text" name="grade" value={this.state.grade} onChange={this.handleInput} disabled={!this.state.isEditing}/>
      </div>
      <label className="text-gray-500 block text-sm">Date:</label>
      <time>{event.date_of_event}</time>
      <div className="flex items-center">
        <label className="text-gray-500 block text-sm">From:</label>
        <time className="mr-4">{event.start_of_event}</time>
        <label className="text-gray-500 block text-sm ">To:</label>
        <time>{event.end_of_event}</time>
      </div>
      <label className="text-gray-500 block text-sm">Volunteer:</label>
      <p>{event.volunteer_name}</p>
      <label for="student-select">Choose a student:</label>
      <select name="student" value={this.state.student} onChange={this.handleInput}>
        <option value="">
          --Please choose a student--
        </option>
        {options}
      </select>
      <button type="button" onClick={this.assignStudent}>Assign student</button>

      <button class="btn-edit bg-blue rounded-full py-3 px-6" onClick={(e) => this.props.deleteEvent(e, event.id)}>delete</button>
      {
        this.state.isEditing
           ? <button class="btn-edit bg-blue flex-col ml-2 mt-2" type='button' onClick={this.saveEvent}>Save</button>
           : <button class="btn-edit bg-blue flex-col ml-2 mt-2 rounded-full py-3 px-6" onClick={() => this.setState({isEditing: true})}>Edit</button>
      }

    </li>
    )
  }
}


export default AdminPageDetail;
