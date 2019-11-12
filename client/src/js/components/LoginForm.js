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
                       header='Unable to login/signup'
                       content={errorReason}
                     />
    }
    return (
      <div className='centered-form'>
        <Segment raised>
          <Header as='h2'>Login / Register</Header>
          {errorMessage}
          <Form onSubmit={this.props.handleSubmit}>
            <Form.Input
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
            <Button color='google plus' onClick={this.props.registerSubmit}>Sign-up</Button>
            <Button primary type='submit'>Log-in</Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

export default LoginForm;
