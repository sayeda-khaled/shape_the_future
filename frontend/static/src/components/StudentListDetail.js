import { Component } from 'react';


class StudentListDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      studentId: this.props.studentId,
      primanryContact: this.props.primanryContact,
      grade: this.props.grade,

    }
    this.handleInput = this.handleInput.bind(this);
    this.saveStudent = this.saveStudent.bind(this);

  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  saveStudent() {
    const student = this.props.student;
    student.first_name = this.state.firstName;
    student.last_name = this.state.lastName;
    student.student_id = this.state.studentId;
    student.primary_contact = this.state.primaryContact;
    student.grade = this.state.grade;

    // event.volunteer = this.state.volunteer;
    this.props.editStudent(student);
    this.setState({ isEditing: false });
  }

  // <input type="text" value={this.state.volunteer} onChange={this.handleInput} name="volunteer"/>


  render() {
    const students = this.props.student;
    return(
      <li>
        <div>
            {
            this.state.isEditing
              ? (
                  <>
                    <input type="text" name="firstName" class="form-control" autoComplete="off" id="exampleFormControlInput1"  value={this.state.first_name} onChange={this.handleInput} rows="3"placeholder="Insert the student first name"/>
                    <input type="text" name="lastName" class="form-control" autoComplete="off" id="exampleFormControlInput1"  value={this.state.last_name} onChange={this.handleInput} rows="3"placeholder="Insert the student last name"/>
                    <input type="number" class="form-control" id="exampleFormControlInput1" autoComplete="off" name="studentId" value={this.state.student_id} onChange={this.handleInput} placeholder="Insert the student ID"/>
                    <input type="text" name="primaryContact" class="form-control" autoComplete="off" id="exampleFormControlInput1"  value={this.state.primary_contact} onChange={this.handleInput} rows="3" placeholder="Insert the student primart contact"/>
                    <input type="number" min="1" max="5" name="grade" value={this.state.grade} onChange={this.handleInput} placeholder="Insert the student grade"/>
                  </>
                )
              : (
                  <>

                    <p>{students.first_name}</p>
                    <p>{students.last_name}</p>
                    <p>{students.student_id}</p>
                    <p>{students.primary_contact}</p>
                    <h2>{students.grade}</h2>
                  </>
                )
            }
            {
            <button onClick={() => this.props.deleteStudent(students.id)}>delete</button>

            }
            {
            this.state.isEditing
              ? <button type='button' onClick={this.saveStudent}>Save</button>
              : <button onClick={() => this.setState({isEditing: true})}>Edit</button>
            }
        </div>
      </li>
    )
  }
}


export default StudentListDetail;
