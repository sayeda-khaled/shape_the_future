import { Component } from 'react';


class AdminPageDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      grade: this.props.events.grade,
      date: this.props.events.date
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


  render() {
    const events = this.props.event;
    return(
      <li>
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
                    <h2>{events.grade}</h2>
                    <time>{events.date}</time>
                    <p>{events.volunteer}</p>
                  </>
                )
            }
            {
            <button onClick={() => this.props.deleteEvent(events.id)}>delete</button>

            }
            {
            this.state.isEditing
              ? <button type='button' onClick={this.saveEvent}>Save</button>
              : <button onClick={() => this.setState({isEditing: true})}>Edit</button>
            }
        </div>
      </li>
    )
  }
}


export default AdminPageDetail;
