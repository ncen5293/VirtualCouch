import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      errorReason: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    this.setState({
      email: '',
      user: '',
      password: ''
    });
  }

  registerSubmit = (event) => {
    this.setState({
      email: '',
      user: '',
      password: ''
    });
  }

  render() {
    return (
      <div className='App-header'>
        <Segment raised>
          <Header as='h1'>
            Virtual Couch
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
        />
      </div>
    )
  }
}

export default Home;
