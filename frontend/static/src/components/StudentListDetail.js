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
      isActive: false,
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

    this.props.editStudent(student);
    this.setState({ isEditing: false });
  }


  deactivateStudent() {
    const student = this.props.student;
    this.props.deactivateStudent(student);
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  }

  assignParent(student) {
    const {id, parent} = this.props.state;
    this.props.assignParent(id, (parent));
    console.log(parent);
  }

  // <input type="text" value={this.state.volunteer} onChange={this.handleInput} name="volunteer"/>


//
//   <>
//   <label for="student-select">Choose a parent</label>
//   <select name="parent" value={this.state.parent} onChange={this.handleInput}>
//     <option value="">
//       --Please choose a parent--
//     </option>
//     {options}
//   </select>
//   <button type="button" className="btn-submit" onClick={this.assignStudent}>Assign student</button>
// </>


  render() {
    const students = this.props.student;
    const parents = this.props.parent;
    // console.log(students.active);
    // const options = this.props.parents.map(parent => <option value={parent.id} selected={parent.student === parent.id}>{`${parent.last_name}, ${parent.last_name}`}</option>)

    return(
        <li className="bg-purple-100 m-6 p-4 rounded-xl">
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


                    <label className="text-gray-500 block text-sm mr-2 ">First Name:</label>
                        <p className="font-semibold">{students.first_name}</p>
                    <label className="text-gray-500 block text-sm mr-2">Last Name:</label>
                        <p className="font-semibold">{students.last_name}</p>
                    <label className="text-gray-500 block text-sm mr-2">Student ID:</label>
                        <p>{students.student_id}</p>
                    <label className="text-gray-500 block text-sm mr-2">Primary Contact:</label>
                        <p>{students.primary_contact}</p>
                    <div className="flex items-center" >
                      <label className="text-gray-500 block text-sm mr-2">Grade:</label>
                      <h2 className="bg-white rounded-full py-2 px-4">{students.grade}</h2>
                    </div>

                  </>
                )


            }
            {

            (
            <>
              <button class="btn-edit bg-blue flex-col ml-.5 mt-2 rounded" onClick={() => this.props.deleteStudent(students.id)}>delete</button>
              <button class="btn-edit bg-blue flex-col ml-2 mt-2 rounded" onClick={() => this.deactivateStudent(students.id)}>{students.active && 'Deactivate'} {!students.active && 'Active'}</button>
            </>
            )
            }
            {
            this.state.isEditing
              ? <button class="btn-edit bg-blue flex-col ml-2 mt-2 rounded" type='button' onClick={this.saveStudent}>Save</button>
              : <button class="btn-edit bg-blue flex-col ml-2 mt-2 rounded" type='button' onClick={() => this.setState({isEditing: true})}>Edit</button>
            }

          </div>
      </li>
    )
  }
}


export default StudentListDetail;
