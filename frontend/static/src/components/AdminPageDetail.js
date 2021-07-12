import { Component } from 'react';


class AdminPageDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      grade: this.props.events?.grade,
      date: this.props.events?.date,
      startTime: this.props.events?.startTime,
      endTime: this.props.events?.endTime,
      // firstName: this.props.students.firstName,
      // lastName: this.props.students.lastName
    }
    this.handleInput = this.handleInput.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.assignStudent = this.assignStudent.bind(this);

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

  assignStudent(event) {
    const eventID = this.props.event.id;
    const studentID = event.target.value;
    this.props.assignStudent(eventID, studentID);
  }


  render() {
    const students = this.props.student;
    const event = this.props.event;
    const options = this.props.students.map(student =>  <option value={student.id} selected={event.student === student.id}>{`${student.last_name}, ${student.first_name}`}</option>)
    return(
      <li className="bg-purple-100 m-6 p-4 rounded w-80">
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
                      <h2 className="bg-white rounded-full py-2 px-4">{event.grade}</h2>
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
                            <p>{event.volunteer}</p>

                        <label for="student-select">Choose a student:</label>
                        <select name="" id="" onChange={this.assignStudent}>
                          <option value=""> --Please choose a student-- </option>
                          {options}
                          
                        </select>


                  </>
                )
            }
            {
            <button class="btn-edit bg-blue rounded-full py-3 px-6" onClick={() => this.props.deleteEvent(event.id)}>delete</button>

            }
            {
            this.state.isEditing
              ? <button class="btn-edit bg-blue flex-col ml-2 mt-2" type='button' onClick={this.saveEvent}>Save</button>
              : <button class="btn-edit bg-blue flex-col ml-2 mt-2 rounded-full py-3 px-6" onClick={() => this.setState({isEditing: true})}>Edit</button>
            }
        </div>
      </li>
    )
  }
}


export default AdminPageDetail;
