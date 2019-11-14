import React, { Component } from 'react';
import { Form, Button, Message, Segment, Header } from 'semantic-ui-react';
import '../styles/Home.css';

class LoginForm extends Component {
  render() {
    const error = this.props.error;
    const errorReason = this.props.errorReason;
    let errorMessage = '';
    if (error) {
      errorMessage = <Message
                       error
                       header={`Unable to ${this.props.tab}`}
                       content={errorReason}
                     />
    }
    if (this.props.tab === 'Log-In') {
      return (
        <div className='centered-form'>
          <Segment raised>
            <Header as='h2'>Log-In</Header>
            {errorMessage}
            <Form>
              <Form.Input
                type='email'
                placeholder='E-mail'
                id='email'
                value={this.props.email}
                onChange={this.props.handleChange}
              />
              <Form.Input
                type='password'
                placeholder='Password'
                id='password'
                value={this.props.password}
                onChange={this.props.handleChange}
              />
              <Button primary onClick={this.props.handleSubmit}>Log-In</Button>
              <Button basic onClick={this.props.changeTab}>Sign-Up</Button>
            </Form>
          </Segment>
        </div>
      )
    } else {
      return (
        <div className='centered-form'>
          <Segment raised>
            <Header as='h2'>Register</Header>
            {errorMessage}
            <Form>
              <Form.Input
                type='email'
                placeholder='E-mail'
                id='email'
                value={this.props.email}
                onChange={this.props.handleChange}
              />
              <Form.Input
                placeholder='Username (at least 5 characters)'
                id='user'
                value={this.props.user}
                onChange={this.props.handleChange}
              />
              <Form.Input
                type='password'
                placeholder='Password (at least 5 characters)'
                id='password'
                value={this.props.password}
                onChange={this.props.handleChange}
              />
              <Button primary onClick={this.props.registerSubmit}>Sign-Up</Button>
              <Button basic onClick={this.props.changeTab}>Log-In</Button>
            </Form>
          </Segment>
        </div>
      )
    }
  }
}

export default LoginForm;
