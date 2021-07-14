import {Component} from 'react';
import Cookies from 'js-cookie';

import defaultProfileImage from './../assets/images/user-profile.png';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      avatar: null,
      preview: '',
      isEditing: false,
      first_name: '',
      last_name: '',
      email: '',
      phone_number: null,
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.saveProfileInfo = this.saveProfileInfo.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);
  }

  componentDidMount() {
    Promise.all([fetch('/api/v1/users/profiles/current_user/'), fetch('/rest-auth/user/')])
    .then(responses => {
      return Promise.all(responses.map(function(response) {
        return response.json();
      }));
    })
    .then(data => {
      const [profile, user] = data;
      this.setState({...profile, ...user  });

    });
  }


  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleImage(e) {
    let file = e.target.files[0];
    this.setState({[e.target.name]: file});
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({preview: reader.result});
    }
    reader.readAsDataURL(file);
  }

  async saveProfileInfo(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('avatar', this.state.avatar);
    formData.append('display_name', this.state.display_name);
    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: formData
    }
    const response = await fetch('/api/v1/users/profiles/current_user/', options);
    this.setState({response})
    // console.log(response);
  }

  editProfile(profile) {
    let formData = new FormData();
    formData.append('display_name', this.state.display_name);

    if (this.state.avatar instanceof File) {
      formData.append('avatar', this.state.avatar);
    }
    const profileKeys = Object.keys(profile);
    profileKeys.foreach(key => formData.append(key, profile[key]));

    const options = {
      method: 'PATCH',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: formData
    }
    fetch('/api/v1/users/profiles/current_user/', options).then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }
      return response.json()
      this.setState({isEditing: false});
    })
  }

  saveUserInfo() {

    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_number: this.state.phone_number,
    }

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(user)
    }
    fetch(`/rest-auth/user/`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User was updated!', data);
    });
  }

  render() {

    let image;
    if (!this.state.avatar && !this.state.preview) {
      image = <img  src={defaultProfileImage} alt=""/>
    } else {
      image = <img src={this.state.preview || this.state.avatar} alt=""/>
    }

    return (
      <>

        <section className="events-container flex bg-opacity-20">
          <form onSubmit={this.handleSubmit} className="form-container-2 sticky mt-12 relative" style={{top: 10 + "VH"}}>

            <div>
              {image}
              <input type="file" name="avatar" onChange={this.handleImage} />
            </div>

            <label className="text-gray-500 block text-sm mr-2 ">User Name</label>
            <input type="text" name="display_name" value={this.state.display_name} onChange={this.handleInput} className="form-control input-1" id="exampleFormControlInput1" rows="3" autoComplete="off"/>
            <button class="btn-edit bg-blue flex-col ml-2 mt-2 rounded" type='button' onClick={this.saveProfileInfo}>Save</button>

          </form>
        </section>

        <section className="events-container flex bg-opacity-20">
          <form className="form-container-2 sticky mt-12" style={{top: 10 + "VH"}}>
            <label className="text-gray-500 block text-sm mr-2 ">First Name</label>
            <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleInput} class="form-control input-1" id="exampleFormControlInput1" rows="3" autoComplete="off"/>
            <label className="text-gray-500 block text-sm mr-2">Last Name</label>
            <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleInput} class="form-control input-1" id="exampleFormControlInput1" rows="3" autoComplete="off"/>
            <label className="text-gray-500 block text-sm mr-2">Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Insert email" class="form-control input-1" id="exampleFormControlInput1" rows="3" autoComplete="off"/>
            <label className="text-gray-500 block text-sm mr-2">Phone Number</label>
            <input type="tel" name="phone_number" value={this.state.phone_number} onChange={this.handleInput} class="form-control input-1" id="exampleFormControlInput1" rows="3"autoComplete="off"/>
            <button class="btn-edit bg-blue flex-col ml-2 mt-2 rounded" type='button' onClick={this.saveUserInfo}>Save</button>

          </form>
        </section>
        </>
    );
  }
}

export default Profile;





    // parent div postiion relative

    // input type file properties
    // position: absolute;
    // bottom: 0;
    // right: 0;
    // top: 0;
    // left: 0;
    // opacity: 0;
