import {Component} from 'react';
import Cookies from 'js-cookie';

import defaultProfileImage from './../assets/images/user-profile2.png';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      avatar: null,
      preview: '',
      isEditingProfile: false,
      isEditing: false,
      first_name: '',
      last_name: '',
      email: '',
      phone_number: null,
      hasProfile: false,
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

      if(!profile.detail) {
        this.setState({...profile, ...user, hasProfile: true  });
      } else {
        this.setState({...user});
      }
    });
  }


  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleImage(e) {
    e.preventDefault();
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

    const hasProfile = !this.state.preview;
    let formData = new FormData();
    if (this.state.avatar instanceof File) {
      formData.append('avatar', this.state.avatar);
    }
    formData.append('display_name', this.state.display_name);

    const options = {
      method: this.state.hasProfile ? 'PATCH' : 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: formData
    }

    const url = this.state.hasProfile ? `/api/v1/users/profiles/current_user/` :`/api/v1/users/profiles/`

    const response = await fetch(url, options);
    this.setState({isEditingProfile: false, hasProfile: true});
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
    })
  }

  saveUserInfo(e) {
    e.preventDefault();
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
      this.setState({isEditing: false})
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

        <section className="events-container m-auto md:flex bg-opacity-20">
          <form onSubmit={this.handleSubmit} className="form-container-3" style={{top: 10 + "VH"}}>

            <div className="relative sticky profile-image">
              {image}
              <input type="file" name="avatar" onChange={this.handleImage} className="absolute inset-0 opacity-0"/>
            </div>
            <div className=" ml-20">
            <label className="text-gray-500 block text-xs	ml-14 pb-1">User Name</label>
            <input type="text" name="display_name" value={this.state.display_name} onChange={this.handleInput} className="font-bold input-1-profile input-1-profile border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" disabled={!this.state.isEditingProfile} autoComplete="off"/>
            </div>
            {
            this.state.isEditingProfile
              ?  <button type='button' className="btn-edit-profile rounded ml-32 transform hover:scale-105" onClick={this.saveProfileInfo}>Save</button>
              : <button type='button' className="btn-edit-profile rounded ml-32 transform hover:scale-105"  onClick={(e) => this.setState({isEditingProfile: true})}>Edit</button>
            }

          </form>


        <section className="events-container flex bg-opacity-20">
          <form className="form-container-4 pl-24" style={{top: 10 + "VH"}}>
            <label className="text-gray-500 block text-xs ml-20 pb-1">First Name</label>
            <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleInput} className="form-control input-1-profile border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" disabled={!this.state.isEditing}  autoComplete="off"/>
            <label className="text-gray-500 block text-xs ml-20 pb-1">Last Name</label>
            <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleInput} className="form-control input-1-profile border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" disabled={!this.state.isEditing}  autoComplete="off"/>
            <label className="text-gray-500 block text-xs ml-20 pb-1">Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Insert email" className="form-control input-1-profile border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" disabled={!this.state.isEditing}  autoComplete="off"/>
            <label className="text-gray-500 block text-xs ml-20 pb-1">Phone Number</label>
            <input type="tel" name="phone_number" value={this.state.phone_number} onChange={this.handleInput} className="form-control input-1-profile border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" disabled={!this.state.isEditing} autoComplete="off"/>
              {
              this.state.isEditing
                ?   <button className="btn-edit-profile ml-20 mt-2 block rounded transform hover:scale-105" type='button' onClick={this.saveUserInfo}>Save</button>
                : <button class="btn-edit-profile ml-20 mt-2 block rounded transform hover:scale-105" type='button' onClick={(e) => this.setState({isEditing: true})}>Edit</button>
              }

          </form>
        </section>

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
