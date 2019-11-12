import React, { Component } from 'react';
import { List, Comment, Icon, Button, Input } from 'semantic-ui-react';
import '../styles/Watch.css';

class PlayerList extends Component {
  render() {
    const inLobby = this.props.inLobby;
    let lobbyChatButton = '';
    if (inLobby) {
      lobbyChatButton = <Button onClick={() => this.props.toggleChat('chat')}>Chat</Button>;
    }
    if (this.props.chatType === 'players') {
      const playerList = this.props.players.map((player, i) => {
        let user = localStorage.getItem('screenName') === player ? <b>{player}</b> : player;
        return (<List.Item key={i}>
                  <List.Content>{user}</List.Content>
                </List.Item>)
      });

      return (
        <div className='group-box'>
          <div className='list-buttons'>
            <Button.Group basic size='mini'>
              {lobbyChatButton}
              <Button onClick={() => this.props.toggleChat('global')}>Global</Button>
              <Button active onClick={() => this.props.toggleChat('players')}>Players</Button>
            </Button.Group>
          </div>
          <div className='player-list' >
            <List divided>
              <List.Item>
                <List.Icon name='users' />
              </List.Item>
              {playerList}
            </List>
          </div>
          <div className='chat-input'>
            Users Online: {this.props.players.length}
          </div>
        </div>
      );
    } else if (this.props.chatType === 'global') {
      const messageList = this.props.messages.map((message, i) => {
        let mess = message.mess.split('\n');
        let messArr = [];
        mess.forEach((item) => {
          if (item.length > 0) {
            messArr.push(<span>{item}<br/></span>)
          }
        })
        return (<Comment key={i}>
                  <Comment.Content>
                    <Comment.Author>
                      {message.name}
                      <Comment.Metadata>
                        <div>{message.time}</div>
                      </Comment.Metadata>
                    </Comment.Author>
                    <Comment.Text>
                      {messArr}
                    </Comment.Text>
                  </Comment.Content>
                </Comment>)
      });

      return (
        <div className='group-box'>
          <div className='list-buttons'>
            <Button.Group basic size='mini'>
              {lobbyChatButton}
              <Button active onClick={() => this.props.toggleChat('global')}>Global</Button>
              <Button onClick={() => this.props.toggleChat('players')}>Players</Button>
            </Button.Group>
          </div>
          <div className='player-list chat-list' >
            <Comment.Group style={{'maxWidth': '100%'}}>
              <Icon name='discussions' circular />
              {messageList}
            </Comment.Group>
          </div>
          <div className='chat-input'>
            <Input
              size='mini'
              icon='chat'
              placeholder='Chat'
              style={{'width': '95%'}}
              onChange={this.props.chatChange}
              onKeyPress={this.props.chatMessage}
              value={this.props.chatInput}
            />
          </div>
        </div>
      );
    } else {
      lobbyChatButton = <Button active onClick={() => this.props.toggleChat('chat')}>Chat</Button>;
      const messageList = this.props.localMessages.map((message, i) => {
        let mess = message.mess.split('\n');
        let messArr = [];
        mess.forEach((item) => {
          if (item.length > 0) {
            messArr.push(<span>{item}<br/></span>)
          }
        })
        return (<Comment key={i}>
                  <Comment.Content>
                    <Comment.Author>
                      {message.name}
                      <Comment.Metadata>
                        <div>{message.time}</div>
                      </Comment.Metadata>
                    </Comment.Author>
                    <Comment.Text>
                      {messArr}
                    </Comment.Text>
                  </Comment.Content>
                </Comment>)
      });

      return (
        <div className='group-box'>
          <div className='list-buttons'>
            <Button.Group basic size='mini'>
              {lobbyChatButton}
              <Button onClick={() => this.props.toggleChat('global')}>Global</Button>
              <Button onClick={() => this.props.toggleChat('players')}>Players</Button>
            </Button.Group>
          </div>
          <div className='player-list chat-list' >
            <Comment.Group style={{'maxWidth': '100%'}}>
              <Icon name='discussions' circular />
              {messageList}
            </Comment.Group>
          </div>
          <div className='chat-input'>
            <Input
              size='mini'
              icon='chat'
              placeholder='Chat'
              style={{'width': '95%'}}
              onChange={this.props.chatChange}
              onKeyPress={this.props.chatMessage}
              value={this.props.chatInput}
            />
          </div>
        </div>
      );
    }

  }
}

export default PlayerList;
