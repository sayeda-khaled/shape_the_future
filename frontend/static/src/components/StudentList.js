import { Component } from 'react';
import StudentListDetail from './StudentListDetail.js';

import Cookies from 'js-cookie';


class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state= {
      students: [],
      parents:[],
      firstName: '',
      lastName: '',
      studentId: null,
      primaryContact: '',
      grade: null,
    }
    this.addStudent = this.addStudent.bind(this);
    this.editStudent = this.editStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deactivateStudent = this.deactivateStudent.bind(this);
    this.assignParent = this.assignParent.bind(this);

    // this.getEvents = this.getEvents.bind(this);

  }

    componentDidMount(){
      Promise.all([fetch('/api/v1/students/'), fetch('/api/v1/students/parents/')])
      .then(responses => {
        return Promise.all(responses.map(function (response) {
      		return response.json();
      	}));
      })
      .then(data => {
        const [students, parents] = data;
        this.setState({students, parents});
        console.log(parents);
      });
    }


  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addStudent(e) {
    e.preventDefault();
    const student = {
      first_name: this.state.firstName,
      last_name: this.state.lastName, //This is the key at the backend..
      student_id: this.state.studentId,
      primary_contact: this.state.primaryContact,
      grade: this.state.grade,

    };
    // console.log(student);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(student),
    }
    fetch('/api/v1/students/', options)
      .then(response => response.json())
      .then(data => {
        const students = [...this.state.students, data];
        // events.push(data);
        this.setState({students, firstName: '', lastName: '', studentId: null, primaryContact: '', grade: ''});
      });
  }

    editStudent(student) {

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(student),
      }
      fetch(`/api/v1/students/${student.id}/`, options)
        .then(response => {
          if(!response.ok) {
            throw new Error('Network response was not ok');
          }
          const students = [...this.state.students];
          // console.log(students);
          const index = students.findIndex(student => student.id === student.id);
          students[index].firstName = student.firstName;
          students[index].lastName = student.lastName;
          students[index].studentID = student.studentID;
          students[index].primaryContact = student.primaryContact;
          students[index].grade = student.grade;

          this.setState({ students });
        });
      }

    deactivateStudent(student) {
      // event.preventDefault();
      const id = student.id;
      // console.log(student);

      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(student),
      }
      fetch(`/api/v1/students/${id}/`, options)
        .then(response => response.json())
        .then(data => {

            const students = [...this.state.students];
            console.log(students);
            const index = students.findIndex(student => student.id === id);
            students[index].active = false;
            this.setState({ students });

        });
      }

      //   .then(data => {
      //     const student = [...this.state.students];
      //     // console.log(events);
      //     const index = students.findIndex(student => student.id === id);
      //     students[index].active = false;
      //     this.setState({ students });
      //       });
      // }


      deleteStudent(id) {
        const options= {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
          },
        }
        fetch(`/api/v1/students/${id}/`, options)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const students = [...this.state.students];
            const index = students.findIndex(event => students.id === id);
            students.splice(index, 1);
            this.setState({ students });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }


  assignParent(studentID, parent_id) {
  // console.log(parentID);
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify({parent: parent_id}),
    }
    fetch(`/api/v1/students/${studentID}/`, options)
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }
        const students = [...this.state.students];
        const index = students.findIndex(student => student.id === studentID);
        students[index].parent = parent_id;
        this.setState({ students });
      });
}
                    //
                    // <div class="mb-3">
                    //   <label for="exampleFormControlTextarea1" class="form-label ">Primary Contact</label>
                    //   <input type="text" name="primaryContact" required class="form-control input-1" autoComplete="off" id="exampleFormControlInput1"  value={this.state.primary_contact} onChange={this.handleInput} />
                    // </div>
                    // const options = this.props.parents.map(parent => <option value={parent.id} selected={parent.student === parent.id}>{`${parent.last_name}, ${parent.last_name}`}</option>)


    render() {
      const students = this.state.students.map(student => (
        <StudentListDetail key={student.id} student={student} deactivateStudent={this.deactivateStudent} deleteStudent={this.deleteStudent} editStudent={this.editStudent} />
      ));
      const options = this.state.parents.map(parent => <option value={parent.id} selected={parent.student === parent.id}>{`${parent.last_name}, ${parent.first_name}`}</option>)


      return (
        <>
          <section className="events-container md:flex">

              <ul>{students}</ul>

                <section className="form-container-2 sticky mt-12" style={{top:10+"VH"}}>
                    <form class="form-1" onSubmit={this.addStudent}>
                    <div class="mb-3">
                      <label for="exampleFormControlTextarea1" class="form-label">First Name</label>
                      <input type="text" name="firstName" required autoComplete="off" id="exampleFormControlInput1"  value={this.state.first_name} onChange={this.handleInput} className="form-control input-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                    </div>

                    <div className="mb-3">
                      <label for="exampleFormControlTextarea1" className="form-label">Last Name</label>
                      <input type="text" name="lastName" required autoComplete="off" id="exampleFormControlInput1"  value={this.state.last_name} onChange={this.handleInput} className="form-control input-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                    </div>

                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label">School Student ID</label>
                      <input type="number" required id="exampleFormControlInput1" autoComplete="off" name="studentId" value={this.state.student_id} onChange={this.handleInput} placeholder="Insert the student ID" className="form-control input-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                      </div>

                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label">Grade</label>
                      <input type="number" min="1" max="5" required id="exampleFormControlInput1" autoComplete="off" name="grade" value={this.state.grade} onChange={this.handleInput} placeholder="Insert the grade" className="form-control input-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                      </div>

                      <label for="parent-select" className="ml-24">Select parent</label>
                      <select name="parent" value={this.state.parent} onChange={this.assignStudent} className="form-control input-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ml-10">
                        <option value="">
                          --Please choose a parent--
                        </option>

                        {options}
                      </select>



                  <button type="submit" onClick={this.addStudent} className="btn-submit-events transform hover:scale-105 ">Submit</button>
                </form>
              </section>
          </section>

        </>
        )
      }

    }

    export default StudentList;
