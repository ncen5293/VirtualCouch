import React, { Component } from 'react';
import { Modal, Image } from 'semantic-ui-react';
import '../styles/Home.css';

class LikeModal extends Component {
  render() {
    return (
      <Modal basic
        open={this.props.open}
        onClose={this.props.onMenuToggle}
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <Image src={this.props.likePopup} className='like-popup' />
      </Modal>
    )

  }
}

export default LikeModal;
