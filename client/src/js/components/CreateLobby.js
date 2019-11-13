import React, { Component } from 'react';
import { Button, Icon, Modal, Input } from 'semantic-ui-react';
import '../styles/Watch.css';

class CreateLobby extends Component {
  render() {
    return (
      <div>
        <Button icon labelPosition='right' size='mini' onClick={this.props.onLobbyCreateToggle}>
          Create Lobby
          <Icon name='plus square outline' />
        </Button>
        <Modal size="mini" open={this.props.isOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.props.onLobbyCreateToggle} >
          <Modal.Header>Create a Lobby</Modal.Header>
          <Modal.Content>
            <Input
              placeholder='Lobby Name'
              style={{'width': '100%'}}
              onChange={this.props.onLobbyNameChange}
            />
            <Input
              placeholder='Password (Optional)'
              style={{'width': '100%'}}
              onChange={this.props.onPasswordChange}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button.Group>
              <Button onClick={this.props.onLobbyCreateToggle} >Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.props.onSubmitLobby} >Create</Button>
            </Button.Group>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default CreateLobby;
