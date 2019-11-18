import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from "react-redux";
import { getRooms, getUsers, getMessage } from "../actions/Index";
import { Menu, Button } from 'semantic-ui-react';
import axios from 'axios';
import ServerBrowser from './ServerBrowser';
import PlayerList from './PlayerList';
import '../styles/Watch.css';

const mapStateToProps = (state) => {
  return {
    lobbies: state.lobbies,
    players: state.players,
    messages: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRooms: lobbies => dispatch(getRooms(lobbies)),
    getUsers: players => dispatch(getUsers(players)),
    getMessage: messages => dispatch(getMessage(messages))
  };
}

class LobbiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badInfo: false,
      badDesc: '',
      chatType: 'global',
      chatInput: '',
      hideFullLobbies: false,
      filterInput: '',
      isCreateLobbyOpen: false,
      lobbyPassword: '',
      lobbyName: '',
      isPasswordModalOpen: false
    }
    this.socket = socketIOClient('');

    this.socket.on('updateRoom', (roomInfo) => {
      this.props.getUsers(roomInfo.players);
    });

    this.socket.on('chatMessage', (message) => {
      this.props.getMessage(message);
      this.scrollToBottom();
    })

    this.socket.on('updateLobbyList', () => {
      this.props.getRooms();
    })
  }

  componentDidMount = () => {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.props.history.push('/');
    } else {
      const joinInfo = {
        screenName: localStorage.getItem('username'),
        roomName: 'world'
      }
      this.socket.emit('joinRoom', (joinInfo));
      window.setTimeout(() => {
        this.props.getRooms();
      }, 10);
    }
  }

  componentWillUnmount = () => {
    this.socket.disconnect();
    this.setState((prevState) => ({
      lobbyList: []
    }));
  }

  toggleChat = (type) => {
    this.setState({ chatType: type });
    setTimeout(() => {
        this.scrollToBottom()
    }, 0)
  }

  chatMessage = (event) => {
    if (event.key === 'Enter' && this.state.chatInput.length > 0) {
      const message = {
        mess: this.state.chatInput,
        where: 'world'
      }
      this.socket.emit('chatMessage', message);
      this.setState({ chatInput: '' })
    }
  }

  scrollToBottom = () => {
    let scrollElement = document.getElementsByClassName("chat-list");
    if (scrollElement[0]) {
      scrollElement[0].scrollTop = scrollElement[0].scrollHeight;
    }
  }

  createLobby = (lobbyInfo) => {
    axios.post('/lobbys/lobby', { lobbyInfo })
      .then(res => {
        const roomId = res.data.newLobby.RoomId;
        localStorage.setItem('roomId', roomId)
        this.props.history.push(`/watch/${roomId}`);
      })
      .catch(error => {
        console.error(error)
      })
  }

  onSubmitLobby = (event) => {
    const lobbyInfo = {
      name: this.state.lobbyName,
      password: this.state.lobbyPassword,
      host: localStorage.getItem('username')
    }
    this.createLobby(lobbyInfo);
  }

  onLobbyCreateToggle = (event) => {
    this.setState((prevState) => ({
      isCreateLobbyOpen: !prevState.isCreateLobbyOpen
    }));
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value});
  }

  onLogoutClick = () => {
    localStorage.removeItem('loggedIn');
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='App-header browser-page'>
        <Menu widths={3}>
          <Menu.Item>
            <Button primary onClick={this.onLogoutClick}>Log-out</Button>
          </Menu.Item>
          <Menu.Item>
            <h2>
              Welcome {localStorage.getItem('username')}
            </h2>
          </Menu.Item>
          <Menu.Item>
            <Button secondary onClick={this.onLogoutClick}>Log-out</Button>
          </Menu.Item>
        </Menu>
        <ServerBrowser
          lobbyList={this.props.lobbies}
          filterInput={this.state.filterInput}
          onChange={this.onChange}
          onLobbyCreateToggle={this.onLobbyCreateToggle}
          isCreateLobbyOpen={this.state.isCreateLobbyOpen}
          onSubmitLobby={this.onSubmitLobby}
        />
        <PlayerList
          players={this.props.players}
          toggleChat={this.toggleChat}
          chatType={this.state.chatType}
          chatMessage={this.chatMessage}
          onChange={this.onChange}
          chatInput={this.state.chatInput}
          messages={this.props.messages}
          inLobby={false}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbiesPage);
