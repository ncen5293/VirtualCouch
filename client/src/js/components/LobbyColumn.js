import React, { Component } from 'react';
import { Table, Header, Icon } from 'semantic-ui-react';
import JoinLobbyButton from './JoinLobbyButton';
import '../styles/Watch.css';

class LobbyColumn extends Component {
  render() {
    const lobby = this.props.lobby;
    return (
      <Table.Row>
        <Table.Cell>
          <Header textAlign='center'>
            <Icon name={this.props.locked} />
          </Header>
        </Table.Cell>
        <Table.Cell textAlign='center'>{lobby.Name}</Table.Cell>
        <Table.Cell textAlign='center'>
          {lobby.Host}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {lobby.Users.length}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <JoinLobbyButton lobby={lobby} />
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default LobbyColumn;
