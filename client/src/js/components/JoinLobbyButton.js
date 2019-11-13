import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Modal, Button, Input, Message } from 'semantic-ui-react';
import '../styles/Watch.css';

class JoinLobbyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordModalOpen: false,
      passwordGuess: '',
      badGuess: false
    }
  }

  joinLobby = (lobby) => {
    if (lobby.Password.length > 0) {
      this.setState((prevState) => ({
        isPasswordModalOpen: !prevState.isPasswordModalOpen
      }));
    } else {
      this.props.history.push(`/watch/${lobby.RoomId}`);
    }
  }

  onClose = () => {
    this.setState((prevState) => ({
      isPasswordModalOpen: !prevState.isPasswordModalOpen,
      badGuess: false,
      passwordGuess: ''
    }));
  }

  onPasswordChange = (event) => {
    this.setState({ passwordGuess: event.target.value});
  }

  onPasswordKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onPasswordSubmit(event);
    }
  }

  //placeholder until check is in backend instead
  onPasswordSubmit = (event) => {
    const lobby = this.props.lobby;
    if (this.state.passwordGuess === lobby.Password) {
      localStorage.setItem('password', this.state.passwordGuess);
      this.props.history.push(`/watch/${lobby.RoomId}`);
    } else {
      this.setState((prevState) => ({
        badGuess: true
      }));
    }
  }

  render() {
    const lobby = this.props.lobby;
    let warning = '';
    if (this.state.badGuess) {
      warning = (<Message negative>
                   Wrong Password!
                 </Message>);
    }
    return (
      <div>
        <Button onClick={() => this.joinLobby(lobby)}>
          Join
        </Button>
        <Modal size="mini" open={this.state.isPasswordModalOpen} closeOnEscape={false} closeOnDimmerClick={false} onClose={this.onClose} >
          <Modal.Header>Enter password</Modal.Header>
          {warning}
          <Modal.Content>
            <Input
              placeholder='Password'
              style={{'width': '100%'}}
              onChange={this.onPasswordChange}
              onKeyPress={this.onPasswordKeyPress}
              value={this.state.passwordGuess}
              type='password'
            />
          </Modal.Content>
          <Modal.Actions>
            <Button.Group>
              <Button onClick={this.onClose} >Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.onPasswordSubmit} >Submit</Button>
            </Button.Group>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default withRouter(JoinLobbyButton);
