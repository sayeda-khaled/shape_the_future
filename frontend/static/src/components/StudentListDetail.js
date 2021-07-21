import { Component } from 'react';


class StudentListDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props.student,
      isEditing: false,
    }
    this.handleInput = this.handleInput.bind(this);
    this.saveStudent = this.saveStudent.bind(this);

  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  saveStudent() {
    const student = this.state;
    delete student.isEditing;

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
    // console.log(parent);
  }





//     <label className="text-gray-500 block text-sm mr-2 ">First Name:</label>
//         <p className="font-semibold">{students.first_name}</p>
//     <label className="text-gray-500 block text-sm mr-2">Last Name:</label>
//         <p className="font-semibold">{students.last_name}</p>
//     <label className="text-gray-500 block text-sm mr-2">School Student ID:</label>
//         <p>{students.student_id}</p>
//     <label className="text-gray-500 block text-sm mr-2">Primary Contact:</label>
//         <p>{students.primary_contact}</p>
//     <div className="flex items-center" >
//       <label className="text-gray-500 block text-sm mr-2">Grade:</label>
//       <h2 className="bg-white rounded-full py-2 px-4">{students.grade}</h2>
//     </div>
//
//   </>
// )



  render() {
    const students = this.props.student;
    const parents = this.props.parent;
    // console.log(students.active);

    return(
        <li className="bg-purple-100 m-6 p-4 rounded-xl transform hover:scale-105 shadow-2xl-dark">
        <div>

                  <>
                  <label className="text-gray-500 block text-sm mr-2 ">First Name:</label>
                    <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleInput} disabled={!this.state.isEditing} className="form-control border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                  <label className="text-gray-500 block text-sm mr-2">Last Name:</label>
                    <input type="text" name="last_name"  value={this.state.last_name} onChange={this.handleInput} disabled={!this.state.isEditing} className="form-control border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                  <label className="text-gray-500 block text-sm mr-2">School Student ID:</label>
                    <input type="number" name="student_id" value={this.state.student_id} onChange={this.handleInput} disabled={!this.state.isEditing} className="form-control border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                    <label className="text-gray-500 block text-sm mr-2">Primary Contact:</label>
                    <input type="text" name="primary_contact" value={this.state.primary_contact} onChange={this.handleInput} disabled={!this.state.isEditing} className="form-control border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                <div className="flex items-center" >
                  <label className="text-gray-500 block text-sm mr-2">Grade:</label>
                    <input type="number" min="1" max="5" name="grade" value={this.state.grade} onChange={this.handleInput} disabled={!this.state.isEditing} className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                </div>
                </>


            <>
              <button className="btn-edit flex-col ml-.5 mt-2 rounded transform hover:scale-105 " onClick={() => this.props.deleteStudent(students.id)}>Delete</button>
              <button className="btn-edit flex-col ml-2 mt-2 rounded transform hover:scale-105 " onClick={() => this.deactivateStudent(students.id)}>{students.active && 'Deactivate'} {!students.active && 'Activate'}</button>
            </>


            {
            this.state.isEditing
              ? <button className="btn-edit bg-blue flex-col ml-2 mt-2 rounded transform hover:scale-105 " type='button' onClick={this.saveStudent}>Save</button>
              : <button className="btn-edit bg-blue flex-col ml-2 mt-2 rounded transform hover:scale-105 " type='button' onClick={() => this.setState({isEditing: true})}>Edit</button>
            }

          </div>
      </li>
    )
  }
}


export default StudentListDetail;
