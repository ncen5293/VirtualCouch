import React, { Component } from 'react';
import { Menu, Icon, Checkbox, Sticky } from 'semantic-ui-react';
import MenuButtons from './MenuButtons';

class NavBar extends Component {
  render() {
    return (
      <Sticky>
        <Menu widths={3}>
          <Menu.Item>
            <MenuButtons
              visibleMenu={this.props.visibleMenu}
              onMenuToggle={this.props.onMenuToggle}
              open={this.props.isMenuOpen}
              visibleProjectModalButton={this.props.visibleProjectModalButton}
              visibleAbilitiesModalButton={this.props.visibleAbilitiesModalButton}
              visibleHobbiesModalButton={this.props.visibleHobbiesModalButton}
              onButtonClick={this.props.onMenuButtonClick}
            />
          </Menu.Item>
          <Menu.Item>
            <h2>
              Nicky Cen
              <a href='https://www.linkedin.com/in/nicky-cen/'>
                <Icon link name='linkedin' />
              </a>
              <a href='https://github.com/ncen5293'>
                <Icon link name='github' />
              </a>
            </h2>
          </Menu.Item>
          <Menu.Item>
            {
              this.props.page === 'home' ?
              <Checkbox
                checked={this.props.onePagePortfolio}
                label='On One Page'
                onChange={this.props.handlePageChange}
              /> :
              <span>Comments Page</span>
            }
          </Menu.Item>
        </Menu>
      </Sticky>
    )
  }
}

export default NavBar;
