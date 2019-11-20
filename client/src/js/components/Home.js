import React, { Component } from 'react';
import axios from 'axios';
import { Message, Segment, Header } from 'semantic-ui-react';
import LoginForm from './LoginForm';
import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      user: '',
      password: '',
      error: false,
      errorReason: '',
      tab: 'Log-In'
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('loggedIn') === 'true') {
      this.props.history.push('/watch');
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    const email = this.state.email;
    const password = this.state.password;
    axios.get('/users/user', {params: { email, password }})
      .then(res => {
        if (res.data.exists) {
          console.log(res.data);
          this.loginRedirect(res.data.username);
        } else {
          this.setState({ error: true, errorReason: 'This account doesn\'t exist!' });
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  registerSubmit = (event) => {
    const email = this.state.email;
    const username = this.state.user;
    const password = this.state.password;
    if (username.length < 5) {
      this.setState({ error: true, errorReason: 'The username is too short!' });
    } else if (password.length < 5) {
      this.setState({ error: true, errorReason: 'The password is too short!' });
    } else {
      axios.post('/users/user', { email, username, password })
        .then(res => {
          if (res.data.error) {
            this.setState({ error: true, errorReason: 'E-mail or username is already in use!' });
          } else {
            console.log(res.data);
            this.loginRedirect(res.data.username);
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  loginRedirect = (user) => {
    localStorage.setItem('username', user);
    localStorage.setItem('loggedIn', 'true');
    this.props.history.push('/watch');
  }

  changeTab = (event) => {
    this.setState(state => ({
        tab: state.tab === 'Log-In' ? 'Sign-Up' : 'Log-In',
        error: false
      }));
  }

  render() {
    return (
      <div className='App-header'>
        <Segment raised>
          <Header as='h1'>
            YouTube With Friends
          </Header>
          <Message>
            Watch YouTube videos together and chat with others!
          </Message>
        </Segment>
        <LoginForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          registerSubmit={this.registerSubmit}
          error={this.state.error}
          errorReason={this.state.errorReason}
          email={this.state.email}
          user={this.state.user}
          password={this.state.password}
          tab={this.state.tab}
          changeTab={this.changeTab}
        />
      </div>
    )
  }
}

export default Home;
