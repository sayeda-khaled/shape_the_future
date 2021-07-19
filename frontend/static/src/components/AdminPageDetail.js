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


      <div className="flex items-center">
        <label className="text-gray-500 block text-sm mr-2">Grade:</label>
        <input type="text" name="grade" value={this.state.grade} onChange={this.handleInput} disabled={!this.state.isEditing} className="rounded border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
      </div>
      <div className="flex items-baseline">
      <label className="text-gray-500 block text-sm mt-4">Date:</label>
      <input type="date" min="2021-7-07" max="2021-12-31" name="date" value={this.state.date_of_event} onChange={this.handleInput} disabled={!this.state.isEditing} className="input-1-admin border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
      </div>
      <div className="flex items-baseline">
        <label className="text-gray-500 block text-sm">From:</label>
        <input type="time" name="startTime" value={this.state.start_of_event} onChange={this.handleInput} disabled={!this.state.isEditing} className="input-1-admin border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
        <label className="text-gray-500 block text-sm ">To:</label>
        <input type="time" name="endTime" value={this.state.end_of_event} onChange={this.handleInput} disabled={!this.state.isEditing} className="input-1-admin border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
      </div>
      <div className="ml-14 mb-3">
        {
          this.state.isEditing
            ? <button className="btn-edit-event bg-blue flex-col ml-1 transform hover:scale-105 " type='button' onClick={this.saveEvent}>Save</button>
            : <button className="btn-edit-event bg-blue flex-col ml-1 rounded-full py-3 px-6 transform hover:scale-105" onClick={() => this.setState({isEditing: true})}>Edit Event</button>
        }
        <button className="btn-edit-event bg-blue rounded-full ml-2 py-3 px-6 transform hover:scale-105 " onClick={(e) => this.props.deleteEvent(e, event.id)}>delete Event</button>
      </div>
      <div className="flex items-baseline mb-2">
      <label className="text-gray-500 block text-sm mr-4">Volunteer:</label>
      <div>{event.volunteer_name}</div>
      </div>
      <label for="student-select" className="pt-1 text-xs">Choose a student:</label>

      <select name="student" value={this.state.student} onChange={this.handleInput} className="mt-2 mb-2">
        <option value="">
          --Please choose a student--
        </option>
        {options}
      </select>
      <button type="button" onClick={this.assignStudent} className="btn-submit-assign-student transform hover:scale-105">Assign</button>

    </li>)
  }
}

export default AdminPageDetail;
