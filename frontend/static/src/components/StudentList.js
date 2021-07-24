import {Component} from 'react';
import StudentListDetail from './StudentListDetail.js';

import Cookies from 'js-cookie';

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      firstName: '',
      lastName: '',
      studentId: null,
      primaryContact: '',
      grade: null
    }
    this.addStudent = this.addStudent.bind(this);
    this.editStudent = this.editStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deactivateStudent = this.deactivateStudent.bind(this);

  }

  componentDidMount() {
    fetch('/api/v1/students/').then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => this.setState({students: data})).catch(error => {
      console.error('There has been a problem with youor fetch operation:', error);
    });
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addStudent(e) {
    e.preventDefault();
    const student = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      student_id: this.state.studentId,
      primary_contact: this.state.primaryContact,
      grade: this.state.grade
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(student)
    }
    fetch('/api/v1/students/', options).then(response => response.json()).then(data => {
      const students = [
        ...this.state.students,
        data
      ];
      // events.push(data);
      this.setState({
        students,
        firstName: '',
        lastName: '',
        studentId: null,
        primaryContact: '',
        grade: ''
      });
    });
  }

  editStudent(student) {

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(student)
    }
    fetch(`/api/v1/students/${student.id}/`, options).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const students = [...this.state.students];
      const index = students.findIndex(student => student.id === student.id);
      students[index].firstName = student.firstName;
      students[index].lastName = student.lastName;
      students[index].studentID = student.studentID;
      students[index].primaryContact = student.primaryContact;
      students[index].grade = student.grade;

      this.setState({students});
    });
  }

  deactivateStudent(student) {
    const id = student.id;

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(student)
    }
    fetch(`/api/v1/students/${id}/`, options).then(response => response.json()).then(data => {

      const students = [...this.state.students];
      console.log(students);
      const index = students.findIndex(student => student.id === id);
      students[index].active = false;
      this.setState({students});

    });
  }

  deleteStudent(id) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      }
    }
    fetch(`/api/v1/students/${id}/`, options).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const students = [...this.state.students];
      const index = students.findIndex(event => students.id === id);
      students.splice(index, 1);
      this.setState({students});
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    const students = this.state.students.map(student => (<StudentListDetail key={student.id} student={student} deactivateStudent={this.deactivateStudent} deleteStudent={this.deleteStudent} editStudent={this.editStudent}/>));

    return (<> < section className = "events-container md:flex" > <ul>{students}</ul>

    <section className="form-container-2 sticky w-7-12" style={{top: 10 + "VH"}}>
      <form class="form-1" onSubmit={this.addStudent}>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">First Name</label>
          <input type="text" name="firstName" required="required" autoComplete="off" id="exampleFormControlInput1" value={this.state.first_name} onChange={this.handleInput} className="form-control input-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
        </div>

        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Last Name</label>
          <input type="text" name="lastName" required="required" autoComplete="off" id="exampleFormControlInput1" value={this.state.last_name} onChange={this.handleInput} className="form-control input-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">School Student ID</label>
          <input type="number" required="required" id="exampleFormControlInput1" autoComplete="off" name="studentId" value={this.state.student_id} onChange={this.handleInput} placeholder="Insert the student ID" className="form-control input-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Grade</label>
          <input type="number" min="1" max="5" required="required" id="exampleFormControlInput1" autoComplete="off" name="grade" value={this.state.grade} onChange={this.handleInput} placeholder="Insert the grade" className="form-control input-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
        </div>

        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Primary Contact</label>
          <input type="text" name="primaryContact" required="required" autoComplete="off" id="exampleFormControlInput1" value={this.state.primary_contact} onChange={this.handleInput} className="form-control input-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
        </div>

        <button type="submit" onClick={this.addStudent} className="btn-submit-events transform hover:scale-105 ">Submit</button>
      </form>
    </section>
  </section>

</>)
  }

}

export default StudentList;
