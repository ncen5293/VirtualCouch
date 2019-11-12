import React, { Component } from 'react';
import { Button, Modal, Transition } from 'semantic-ui-react';
import HomeButtons from './HomeButtons';
import profilepicture from '../images/profilepic2.0.png';
import '../styles/Home.css';

class MenuButtons extends Component {
  render() {
    return (
      <div>
        <Transition visible={this.props.visibleMenu} animation='browse' duration={500} >
          <Button icon='th' onClick={this.props.onMenuToggle} className='menu-button' />
        </Transition>
        <Modal basic
          open={this.props.open}
          closeOnEscape={true}
          closeOnDimmerClick={true}
          onClose={this.props.onMenuToggle}
        >
          <Modal.Content>
              <img src={profilepicture} alt='profile' className='profile-pic' />
              <div className='modal-buttons' >
                <HomeButtons
                  visibleButton={this.props.visibleProjectModalButton}
                  onButtonClick={this.props.onButtonClick}
                  leftButton='My Projects'
                  rightButton='Portfolio Page'
                  position='top'
                  modal={true}
                />
                <HomeButtons
                  visibleButton={this.props.visibleAbilitiesModalButton}
                  onButtonClick={this.props.onButtonClick}
                  leftButton='My Hobbies'
                  rightButton='Watch Together'
                  position='middle'
                  modal={true}
                />
                <HomeButtons
                  visibleButton={this.props.visibleHobbiesModalButton}
                  onButtonClick={this.props.onButtonClick}
                  leftButton='My Abilities'
                  rightButton='Comments Page'
                  position='bottom'
                  modal={true}
                />
              </div>
          </Modal.Content>
        </Modal>
      </div>
    )

  }
}

export default MenuButtons;
