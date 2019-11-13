import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Icon, Menu, Button } from 'semantic-ui-react';
import axios from 'axios';
import ServerBrowser from './ServerBrowser';
import CreateNameModal from './CreateNameModal';
import PlayerList from './PlayerList';
import '../styles/Watch.css';

class LobbiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      messages: [],
      lobbyList: [],
      screenName: '',
      badInfo: false,
      badDesc: '',
      chatType: 'global',
      chatInput: '',
      hideFullLobbies: false,
      filterInput: '',
      isCreateLobbyOpen: false,
      lobbyPassword: '',
      lobbyName: '',
      isRenameModalOpen: false,
      isPasswordModalOpen: false
    }
    this.socket = socketIOClient('http://localhost:8080');

    this.socket.on('updateRoom', (roomInfo) => {
      this.setState((prevState) => ({
        players: roomInfo.players
      }));
      console.log(roomInfo);
    });

    this.socket.on('chatMessage', (message) => {
      this.setState((prevState) => ({
        messages: prevState.messages.concat(message)
      }));
      this.scrollToBottom();
    })

    this.socket.on('updateLobbyList', () => {
      this.getLobbies();
      console.log('update lobby list');
    })
  }

  getLobbies = async () => {
    await axios.get('http://localhost:8080/lobbys/lobby', {params: { roomId: '' }})
      .then(res => {
        console.log(res.data);
        this.setState({ lobbyList: res.data.lobbies });
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidMount = () => {
    localStorage.removeItem('password');
    const joinInfo = {
      screenName: localStorage.getItem('screenName'),
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

  onNameModalClose = () => {
    const screenName = this.state.screenName;
    const players = this.state.players;
    let nameInUse = false;
    if (screenName.length >= 3 && screenName.length <= 20) {
      players.forEach((player) => {
        console.log(player);
        if (player === screenName) {
          nameInUse = true;
          this.setState({ badInfo: true, badDesc: 'Name is already in use!' });
        }
      })
      if (!nameInUse) {
        this.setState({ badInfo: false, isRenameModalOpen: false });
        localStorage.setItem('screenName', screenName);
        this.socket.emit('updatePlayerName', localStorage.getItem('screenName'));
      }
    } else {
      this.setState({ badInfo: true, badDesc: 'Name needs to be between 3-20 characters!' });
    }
  }

  onSubmitName = () => {
    this.onNameModalClose();
  }

  onCancelNameClick = () => {
    this.props.history.goBack();
  }

  onNameChange = (event) => {
    this.setState({screenName: event.target.value});
  }

  onNameSubmit = (event) => {
    if (event.key === 'Enter') {
      this.onNameModalClose();
    }
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

  chatChange = (event) => {
    this.setState({ chatInput: event.target.value});
  }

  scrollToBottom = () => {
    let scrollElement = document.getElementsByClassName("chat-list");
    if (scrollElement[0]) {
      scrollElement[0].scrollTop = scrollElement[0].scrollHeight;
    }
  }

  onLobbiesCheckChange = () => {
    this.setState((prevState) => ({
      hideFullLobbies: !prevState.hideFullLobbies
    }));
  }

  onFilterKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.setState({ filterInput: '' })
    }
  }

  onFilterChange = (event) => {
    this.setState({ filterInput: event.target.value});
  }

  createLobby = (lobbyInfo) => {
    axios.post('http://localhost:8080/lobbys/lobby', { lobbyInfo })
      .then(res => {
        this.props.history.push(`/watch/${res.data.newLobby.RoomId}`);
      })
      .catch(error => {
        console.error(error)
      })
  }

  onSubmitLobby = (event) => {
    const lobbyInfo = {
      name: this.state.lobbyName,
      password: this.state.lobbyPassword,
      host: localStorage.getItem('screenName'),
      users: localStorage.getItem('screenName')
    }
    if (lobbyInfo.password.length > 0) {
      localStorage.setItem('password', lobbyInfo.password);
    }
    this.createLobby(lobbyInfo);
  }

  onLobbyCreateToggle = (event) => {
    this.setState((prevState) => ({
      isCreateLobbyOpen: !prevState.isCreateLobbyOpen
    }));
  }

  onPasswordChange = (event) => {
    this.setState({ lobbyPassword: event.target.value});
  }

  onLobbyNameChange = (event) => {
    this.setState({ lobbyName: event.target.value});
  }

  toggleRenameModal = (event) => {
    this.setState((prevState) => ({
      isRenameModalOpen: !prevState.isRenameModalOpen
    }));
  }

  render() {
    const hasSetName = localStorage.getItem('screenName') !== null;
    return (
      <div className='App-header browser-page'>
        <Menu widths={3}>
          <Menu.Item>
            <Button primary onClick={() => {this.props.history.push('/')} }>Home Page</Button>
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
            <Button secondary onClick={() => {this.props.history.push('/comments')} }>Comments Page</Button>
          </Menu.Item>
        </Menu>
        <ServerBrowser
          lobbyList={this.state.lobbyList}
          hideFullLobbies={this.state.hideFullLobbies}
          onLobbiesCheckChange={this.onLobbiesCheckChange}
          filterInput={this.state.filterInput}
          onFilterKeyPress={this.onFilterKeyPress}
          onFilterChange={this.onFilterChange}
          isCreateLobbyOpen={this.state.isCreateLobbyOpen}
          onSubmitLobby={this.onSubmitLobby}
          onLobbyCreateToggle={this.onLobbyCreateToggle}
          onPasswordChange={this.onPasswordChange}
          onLobbyNameChange={this.onLobbyNameChange}
          toggleRenameModal={this.toggleRenameModal}
        />
        <PlayerList
          players={this.state.players}
          toggleChat={this.toggleChat}
          chatType={this.state.chatType}
          chatMessage={this.chatMessage}
          chatChange={this.chatChange}
          chatInput={this.state.chatInput}
          messages={this.state.messages}
          inLobby={false}
        />
        <CreateNameModal
          open={!hasSetName}
          rename={this.state.isRenameModalOpen}
          screenName={this.state.screenName}
          onNameChange={this.onNameChange}
          onNameSubmit={this.onNameSubmit}
          onClose={this.onNameModalClose}
          onSubmitName={this.onSubmitName}
          onCancelNameClick={this.onCancelNameClick}
          badInfo={this.state.badInfo}
          badDesc={this.state.badDesc}
          toggleRenameModal={this.toggleRenameModal}
        />
      </div>
    )
  }
}

export default LobbiesPage;
