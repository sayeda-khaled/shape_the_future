import { Component } from 'react';
import Cookies from 'js-cookie';


class Profile extends Component{

  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      avatar: null,
      preview: '',
      isEditing: false
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }
  // 
  // componentDidMount(){
  //   fetch('/api/v1/users/profiles/user')
  //   .then(response => response.json())
  //   .then(data=> console.log(data));
  // }



    componentDidMount(){
      fetch('/api/v1/users/profiles/user')
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => this.setState({ ...data  }))
      .catch(error => {
        console.error('There has been a problem with youor fetch operation:', error);
      });
    }


  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleImage(e) {
    let file = e.target.files[0];
      this.setState({
       [e.target.name]: file,
     });
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        preview: reader.result,
      });
    }
    reader.readAsDataURL(file);
  }

  async handleSubmit(e) {
    e.preventDefault();
    let formData= new FormData();
    formData.append('avatar', this.state.avatar);
    formData.append('display_name', this.state.display_name);
    const options = {
        method: 'POST',
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: formData,
      }
      const response = await fetch('/api/v1/users/profiles/', options);
      this.setState({ response })
      // console.log(response);
  }

  editProfile(profile) {
      let formData= new FormData();

      if (this.state.avatar) {
      formData.append('avatar', this.state.avatar);
      }
      if (this.state.display_name) {
          formData.append('display_name', this.state.display_name);
      }

      const options ={
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(profile)
      }
      fetch('/api/v1/users/profile/user/', options)

        .then(response =>{
          if(!response.ok) {
            throw new Error('Error');
          }
          return response.json()
          this.setState({ isEditing: false });
        })

  }

  render(){
  return (
    <>
        <form onSubmit={this.handleSubmit}>
            <section className="profile">
              <input type='text' name="display_name" value={this.state.display_name} onChange={this.handleInput} />
              <input type="file" name="avatar" onChange={this.handleImage}/>
              {this.state.avatar
                ? <img src={this.state.preview || this.state.avatar} alt=""/>
                : null
              }
            </section>
            <button type="submit">Save Profile!</button>
        </form>



    </>
  )}
}

export default Profile;
