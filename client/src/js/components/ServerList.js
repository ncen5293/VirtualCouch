import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import LobbyColumn from './LobbyColumn';
import '../styles/Watch.css';

class ServerList extends Component {
  render() {
    const lobbies = this.props.lobbyList.map((lobby, i) => {
      var regex = RegExp(this.props.filterInput);
      console.log(regex.test(lobby.Name))
      if (regex.test(lobby.Name)) {
        let locked = 'lock open';
        if (lobby.Password.length > 0) {
          locked = 'lock';
        }
        return (
          <LobbyColumn
            locked={locked}
            lobby={lobby}
            key={i}
          />
        )
      } else {
        return ''
      }
    });
    return (
      <div className='server-list'>
        <Table celled padded size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}></Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
              <Table.HeaderCell width={2} textAlign='center'>Host</Table.HeaderCell>
              <Table.HeaderCell width={2} textAlign='center'>Users</Table.HeaderCell>
              <Table.HeaderCell width={2}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {lobbies}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default ServerList;
