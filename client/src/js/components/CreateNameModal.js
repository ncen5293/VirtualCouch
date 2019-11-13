import React, { Component } from 'react';
import { Modal, Button, Input, Message } from 'semantic-ui-react';
import '../styles/Home.css';

class CreateNameModal extends Component {
  render() {
    let warning = '';
    if (this.props.badInfo) {
      warning = (<Message negative>
                   <Message.Header>Unable to use that name</Message.Header>
                   <p>{this.props.badDesc}</p>
                 </Message>);
    }

    const goBack = !this.props.rename ? this.props.onCancelNameClick : this.props.toggleRenameModal;
    const open = this.props.open || this.props.rename;

    return (
      <Modal size="mini" open={open} closeOnEscape={false} closeOnDimmerClick={false} onClose={this.props.onClose} >
        <Modal.Header>Create a Screen Name</Modal.Header>
        <Modal.Content>
          {warning}
          <Input
            placeholder='Screen Name'
            style={{'width': '100%'}}
            onChange={this.props.onNameChange}
            onKeyPress={this.props.onNameSubmit}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button onClick={goBack} >Go Back</Button>
            <Button.Or />
            <Button positive onClick={this.props.onSubmitName} >Set Name</Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CreateNameModal;
