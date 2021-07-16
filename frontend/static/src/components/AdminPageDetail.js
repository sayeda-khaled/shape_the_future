import {Component} from 'react';

class AdminPageDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props.event,
      isEditing: false
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
      <div>
        {
          this.state.isEditing
            ? <button class="btn-edit bg-blue flex-col ml-2 mt-2" type='button' onClick={this.saveEvent}>Save</button>
            : <button class="btn-edit bg-blue flex-col ml-2 mt-2 rounded-full py-3 px-6" onClick={() => this.setState({isEditing: true})}>Edit Event</button>
        }
        <button class="btn-edit bg-blue rounded-full py-3 px-6" onClick={(e) => this.props.deleteEvent(e, event.id)}>delete Event</button>
      </div>

      <div className="flex items-center">
        <label className="text-gray-500 block text-sm mr-2">Grade:</label>
        <input type="text" name="grade" value={this.state.grade} onChange={this.handleInput} disabled={!this.state.isEditing}/>
      </div>
      <label className="text-gray-500 block text-sm">Date:</label>
      <input type="date" min="2021-7-07" max="2021-12-31" class="input-1" name="date" value={this.state.date_of_event} onChange={this.handleInput} disabled={!this.state.isEditing}/>

      <div className="flex items-center">
        <label className="text-gray-500 block text-sm">From:</label>
        <input type="time" className="input-1" name="startTime" value={this.state.start_of_event} onChange={this.handleInput} disabled={!this.state.isEditing}/>
        <label className="text-gray-500 block text-sm ">To:</label>
        <input type="time" className="input-1" name="endTime" value={this.state.end_of_event} onChange={this.handleInput} disabled={!this.state.isEditing}/>

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
      <button type="button" className="btn-submit" onClick={this.assignStudent}>Assign student</button>

    </li>)
  }
}

export default AdminPageDetail;
