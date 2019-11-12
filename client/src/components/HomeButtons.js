import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react';
import '../styles/Home.css';

class HomeButtons extends Component {
  render() {
    const visibleButton = this.props.visibleButton;
    const leftButton = this.props.leftButton;
    const rightButton = this.props.rightButton;
    const position = this.props.position;
    const leftButtonStyle = 'left-projects-button ' + position + '-left nav-button';
    let rightButtonStyle = 'right-projects-button ' + position + '-right nav-button';
    if (this.props.modal) {
      rightButtonStyle += ' right-modal-button';
    }
    return (
      <Transition visible={visibleButton} animation='vertical flip' duration={500}>
        <div className='button-row'>
          <div className={leftButtonStyle} onClick={() => this.props.onButtonClick(leftButton)} >
            <h2 className='inner-projects-button'>
              {leftButton}
            </h2>
          </div>
          <div className={rightButtonStyle} onClick={() => this.props.onButtonClick(rightButton)} >
            <h2 className='right-inner-projects-button'>
              {rightButton}
            </h2>
          </div>
        </div>
      </Transition>
    )

  }
}

export default HomeButtons;
