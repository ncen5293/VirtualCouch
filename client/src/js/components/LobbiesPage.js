import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from "react-redux";
import { setRoom } from "../actions/Index";
import { Icon, Menu, Button } from 'semantic-ui-react';
import axios from 'axios';
import ServerBrowser from './ServerBrowser';
import PlayerList from './PlayerList';
import '../styles/Watch.css';

const mapStateToProps = (state) => {
  return { username: state.username };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRoom: roomId => dispatch(setRoom(roomId))
  };
}

class LobbiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      messages: [],
      lobbyList: [],
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
    this.socket = socketIOClient('http://localhost:8080');

    this.socket.on('updateRoom', (roomInfo) => {
      this.setState((prevState) => ({
        players: roomInfo.players
      }));
    });

    this.socket.on('chatMessage', (message) => {
      this.setState((prevState) => ({
        messages: prevState.messages.concat(message)
      }));
      this.scrollToBottom();
    })

    this.socket.on('updateLobbyList', () => {
      this.getLobbies();
    })
  }

  getLobbies = async () => {
    await axios.get('http://localhost:8080/lobbys/lobby', {params: { roomId: '' }})
      .then(res => {
        this.setState({ lobbyList: res.data.lobbies });
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidMount = () => {
    const joinInfo = {
      screenName: this.props.username,
      roomName: 'world'
    }
    this.socket.emit('joinRoom', (joinInfo));
    window.setTimeout(() => {
      this.getLobbies();
    }, 10);
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
    axios.post('http://localhost:8080/lobbys/lobby', { lobbyInfo })
      .then(res => {
        const roomId = res.data.newLobby.RoomId;
        this.props.setRoom(roomId);
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
      host: this.props.username
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

  render() {
    const username = this.props.username;
    return (
      <div className='App-header browser-page'>
        <Menu widths={3}>
          <Menu.Item>
            <Button primary onClick={() => {this.props.history.push('/')} }>Log-out</Button>
          </Menu.Item>
          <Menu.Item>
            <h2>
              Welcome {username}
            </h2>
          </Menu.Item>
          <Menu.Item>
            <Button secondary onClick={() => {this.props.history.push('/profile')} }>Profile</Button>
          </Menu.Item>
        </Menu>
        <ServerBrowser
          lobbyList={this.state.lobbyList}
          filterInput={this.state.filterInput}
          onChange={this.onChange}
          onLobbyCreateToggle={this.onLobbyCreateToggle}
          isCreateLobbyOpen={this.state.isCreateLobbyOpen}
          onSubmitLobby={this.onSubmitLobby}
        />
        <PlayerList
          players={this.state.players}
          toggleChat={this.toggleChat}
          chatType={this.state.chatType}
          chatMessage={this.chatMessage}
          onChange={this.onChange}
          chatInput={this.state.chatInput}
          messages={this.state.messages}
          inLobby={false}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbiesPage);
