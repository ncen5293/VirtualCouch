import React, { Component } from 'react';
import { Input, Menu, Button, Icon } from 'semantic-ui-react';
import CreateLobby from './CreateLobby';
import '../styles/Watch.css';

class ServerListFilter extends Component {
  render() {
    return (
      <div className='server-filter'>
        <Menu widths={3}>
          <Menu.Item>
            <Input
              size='mini'
              icon='search'
              placeholder='Filter'
              onKeyPress={this.props.onFilterKeyPress}
              onChange={this.props.onFilterChange}
              value={this.props.filterInput}
              style={{'width': '90%'}}
            />
          </Menu.Item>
          <Menu.Item>
            <div>
              <Button icon labelPosition='right' size='mini' onClick={this.props.toggleRenameModal} >
                Rename
                <Icon name='edit outline' />
              </Button>
            </div>
          </Menu.Item>
          <Menu.Item>
            <CreateLobby
              onLobbyNameChange={this.props.onLobbyNameChange}
              onPasswordChange={this.props.onPasswordChange}
              onLobbyCreateToggle={this.props.onLobbyCreateToggle}
              onSubmitLobby={this.props.onSubmitLobby}
              isOpen={this.props.isCreateLobbyOpen}
            />
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default ServerListFilter;
