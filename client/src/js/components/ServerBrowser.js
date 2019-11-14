import React, { Component } from 'react';
import ServerListFilter from './ServerListFilter';
import ServerList from './ServerList';
import '../styles/Watch.css';

class ServerBrowser extends Component {
  render() {
    return (
      <div className='server-browser'>
        <ServerListFilter
          filterInput={this.props.filterInput}
          onChange={this.props.onChange}
          onLobbyCreateToggle={this.props.onLobbyCreateToggle}
          onSubmitLobby={this.props.onSubmitLobby}
          isCreateLobbyOpen={this.props.isCreateLobbyOpen}
          toggleRenameModal={this.props.toggleRenameModal}
        />
        <ServerList
          lobbyList={this.props.lobbyList}
          hideFullLobbies={this.props.hideFullLobbies}
          filterInput={this.props.filterInput}
        />
      </div>
    )
  }
}

export default ServerBrowser;
