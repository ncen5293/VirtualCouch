import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from "react-redux";
import { getUsers, getMessage, getLocalMessage } from "../actions/Index";
import { Icon, Menu, Button } from 'semantic-ui-react';
import axios from 'axios';
import YouTube from 'react-youtube';
import PlayerList from './PlayerList';
import Searchbar from './Searchbar';
import '../styles/Watch.css';

const mapStateToProps = (state) => {
  return {
    lobbyList: state.lobbyList,
    players: state.players,
    messages: state.messages,
    localMessages: state.localMessages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: players => dispatch(getUsers(players)),
    getMessage: messages => dispatch(getMessage(messages)),
    getLocalMessage: localMessages => dispatch(getLocalMessage(localMessages))
  };
}

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: {},
      chatType: 'chat',
      chatInput: '',
      searchValue: '',
      videoIds: [],
      startTime: 0,
      videoPlayer: null
    }

    this.socket = socketIOClient('http://localhost:8080');

    this.socket.on('updateRoom', (roomInfo) => {
      if (roomInfo.roomName !== 'world' && roomInfo.players) {
        this.props.getUsers(roomInfo.players);
      }
    });

    this.socket.on('chatMessage', (message) => {
      if (message.where === 'world') {
        this.props.getMessage(message);
      } else {
        this.props.getLocalMessage(message);
      }
      this.scrollToBottom();
    })

    this.socket.on('getYoutubeData', () => {
      this.getVideoIds();
    })

    this.socket.on('getNextYoutubeData', () => {
      axios.get('http://localhost:8080/lobbys/video', {params: { roomId: this.props.match.params.roomId }})
        .then(res => {
          console.log(res.data.startTime, this.state.startTime);
          this.setState((prevState) => ({
            videoIds: res.data.videoIds,
            startTime: res.data.startTime
          }));
          const videoPlayer = this.state.videoPlayer;
          this.playNextVideo(this.state.videoPlayer, res.data.videoIds, res.data.startTime);
          if (videoPlayer.getPlayerState() === 1 && res.data.videoIds.length === 0) {
            this.getCorrectTimestamp(videoPlayer);
          }
        })
        .catch(error => {
          console.error(error)
        })
    })

    this.socket.on('changeTimestamp', () => {
      axios.get('http://localhost:8080/lobbys/video', {params: { roomId: this.props.match.params.roomId }})
        .then(res => {
          console.log(res.data.startTime, this.state.startTime);
          this.setState((prevState) => ({
            videoIds: res.data.videoIds,
            startTime: res.data.startTime
          }));
          this.getCorrectTimestamp(this.state.videoPlayer);
        })
        .catch(error => {
          console.error(error)
        })
    })

    this.socket.on('enqueueMessage', (message) => {
      this.setVideoPlayerMessage(message.mess, message.name, '');
    })
  }

  getVideoIds = () => {
    axios.get('http://localhost:8080/lobbys/video', {params: { roomId: this.props.match.params.roomId }})
      .then(res => {
        const videoPlayer = this.state.videoPlayer;
        if (videoPlayer && (videoPlayer.getPlayerState() !== 1 || this.state.startTime === 0)) {
          this.playNextVideo(this.state.videoPlayer, res.data.videoIds, res.data.startTime);
        }
        this.setState((prevState) => ({
          videoIds: res.data.videoIds,
          startTime: res.data.startTime
        }));
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidMount = () => {
    if (localStorage.getItem('roomId') === this.props.match.params.roomId) {
      this.joinLobby();
      this.setVideoPlayerMessage('!help for all commands', 'System', '');
    } else {
      window.location.replace('/watch');
    }
  }

  joinLobby = () => {
    axios.put('http://localhost:8080/lobbys/lobby',
      {
        roomId: this.props.match.params.roomId,
        user: localStorage.getItem('screenName'),
        reason: 'join',
        password: localStorage.getItem('password')
      })
      .then(res => {
        if (res.data.exists) {
          this.joinChatLobby();
          const lobby = res.data.lobby;
          this.setState((prevState) => ({
            lobby,
            videoIds: lobby.VideoIds,
            startTime: lobby.StartTime
          }));
        } else {
          window.location.replace('/watch');
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  joinChatLobby = () => {
    const globalInfo = {
      screenName: localStorage.getItem('username'),
      roomName: 'world'
    }
    const joinInfo = {
      screenName: localStorage.getItem('username'),
      roomName: this.props.match.params.roomId
    }
    this.socket.emit('joinRoom', (globalInfo));
    this.socket.emit('joinRoom', (joinInfo));
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onLeaveClick = () => {
    this.socket.disconnect();
    window.location.replace('/watch');
  }

  componentWillUnmount = () => {
    this.socket.disconnect();
  }

  toggleChat = (type) => {
    this.setState({ chatType: type });
    setTimeout(() => {
        this.scrollToBottom()
    }, 0);
  }

  scrollToBottom = () => {
    let scrollElement = document.getElementsByClassName("chat-list");
    if (scrollElement[0]) {
      scrollElement[0].scrollTop = scrollElement[0].scrollHeight;
    }
  }

  chatMessage = (event) => {
    if (event.key === 'Enter' && this.state.chatInput.length > 0) {
      const message = {
        mess: this.state.chatInput
      }
      if (this.state.chatInput === '!queue') {
        this.getVideoQueue();
        this.setState({ chatInput: '' })
        return;
      } else if (this.state.chatInput === '!help') {
        this.outputCommands();
        this.setState({ chatInput: '' })
        return;
      } else if (this.state.chatInput.substring(0,8) === '!forward' && /^-{0,1}\d+$/.test(this.state.chatInput.substring(8))) {
        this.changeTimestamp(this.state.chatInput.substring(8));
      } else if (this.state.chatInput.substring(0,9) === '!backward' && /^-{0,1}\d+$/.test(this.state.chatInput.substring(9))) {
        this.changeTimestamp(-this.state.chatInput.substring(9));
      } else if (this.state.chatType === 'global') {
        message.where = 'world';
      } else {
        message.where = this.props.match.params.roomId;
      }
      this.socket.emit('chatMessage', message);
      this.setState({ chatInput: '' })
    }
  }

  getVideoQueue = async () => {
    const KEY = 'AIzaSyD2yIRUZp5tQxt8o06cIRuGgKTJbNksNjA';
    let systemMess = '';
    for (let i=1; i<this.state.videoIds.length; i++) {
      await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
            id: this.state.videoIds[i],
            part: 'snippet',
            key: KEY
        }
      })
      .then(res => {
        const videoData = res.data.items[0];
        if (videoData) {
          systemMess += `${i}) ` + videoData.snippet.title + '\n';
        }
      })
    }
    systemMess = systemMess.length > 0 ? systemMess : 'There are no videos in queue!'
    this.setVideoPlayerMessage(systemMess, 'Queue', '');
  }

  outputCommands = () => {
    const message = `!help for all commands
                     -
                     !queue for list of video queue
                     -
                     !forward[number] to skip forward that many seconds
                     -
                     !backward[number] to go back that many seconds
                     -
                     search for videos by name in the top search bar
                     -
                     /[video_id] in the top search bar to queue specific video`;
    this.setVideoPlayerMessage(message, 'System', '');
  }

  onSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      const KEY = 'AIzaSyD2yIRUZp5tQxt8o06cIRuGgKTJbNksNjA';
      const searchValue = this.state.searchValue;
      if (searchValue[0] === '/') {
        axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
              id: searchValue.substring(1),
              part: 'snippet',
              key: KEY
          }
        })
        .then(res => {
          if (res.data.items[0]) {
            this.setYoutubeData(searchValue.substring(1));
          } else {
            this.setVideoPlayerMessage('Video ID does not exist!', 'System', '');
          }
        })
      } else {
        this.getSearchData(searchValue);
      }
      this.setState({ searchValue: '' });
    }
  }

  getSearchData = (searchValue) => {
    const KEY = 'AIzaSyD2yIRUZp5tQxt8o06cIRuGgKTJbNksNjA';
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
          q: searchValue,
          part: 'snippet',
          maxResults: 1,
          key: KEY
      }
    })
    .then(res => {
      if (res.data.items[0] !== null) {
        this.setYoutubeData(res.data.items[0].id.videoId);
      } else {
        this.setVideoPlayerMessage('Try searching for something else!', 'No Videos Found', '');
      }
    })
  }

  setYoutubeData = (videoId) => {
    axios.post('http://localhost:8080/lobbys/video', { roomId: this.props.match.params.roomId, videoId: videoId })
      .then(res => {
        this.socket.emit('getYoutubeData');
        this.queuedVideoMessage(videoId);
      })
      .catch(error => {
        console.error(error)
      })
  }

  queuedVideoMessage = (videoId) => {
    const KEY = 'AIzaSyD2yIRUZp5tQxt8o06cIRuGgKTJbNksNjA';
    axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
          id: videoId,
          part: 'snippet',
          key: KEY
      }
    })
    .then(res => {
      const videoData = res.data.items[0];
      if (videoData) {
        const message = {
          mess: videoData.snippet.title,
          name: 'Enqueue'
        }
        this.socket.emit('enqueueMessage', message);
      }
    })
  }

  setVideoPlayerMessage = (mess, name, time) => {
    const message = {
      mess,
      name,
      time
    }
    if (this.state.chatType === 'chat') {
      this.props.getLocalMessage(message);
    } else {
      this.props.getMessage(message);
    }
    setTimeout(() => {
        this.scrollToBottom()
    }, 0)
  }

  onPlay = (event) => {
    if (event.target.getCurrentTime() < 1) {
      const videoData = this.state.videoPlayer.getVideoData();
      this.setVideoPlayerMessage(`${videoData.title}`, 'Now Playing', `${event.target.getDuration()}s`);
    }
  }

  playNextVideo = (videoPlayer, videoIds, startTime) => {
    if (videoIds.length > 0) {
      console.log('playing video');
      let elapsedTime = this.getElapsedTime(startTime);
      console.log(elapsedTime);
      videoPlayer.loadVideoById(videoIds[0], elapsedTime);
    }
  }

  onReady = async (event) => {
    this.setState({ videoPlayer: event.target });
    this.getVideoIds();
    console.log(event.target);
  }

  onEnd = (event) => {
    this.deleteWatchedId();
    this.setState({ startTime: 0 });
  }

  skipVideo = () => {
    if (this.state.videoIds.length > 0) {
      this.deleteWatchedId();
    }
  }

  deleteWatchedId = () => {
    axios.delete('http://localhost:8080/lobbys/video', {params: { roomId: this.props.match.params.roomId, videoId: this.state.videoIds[0] }})
      .then(res => {
        this.socket.emit('getNextYoutubeData');
      })
      .catch(error => {
        console.error(error)
      })
  }

  onPause = (event) => {
    this.getCorrectTimestamp(event.target);
  }

  getCorrectTimestamp = (videoPlayer) => {
    let elapsedTime = this.state.startTime !== 0 ? this.getElapsedTime(this.state.startTime, videoPlayer) : videoPlayer.getDuration() - 1;
    console.log(elapsedTime, this.state.startTime);
    videoPlayer.seekTo(elapsedTime);
    videoPlayer.playVideo();
  }

  getElapsedTime = (startTime, videoPlayer) => {
    let elapsedTime = (Date.now() - startTime) / 1000;
    if (videoPlayer) {
      if (elapsedTime < 0) {
        elapsedTime = 0;
      } else if (elapsedTime >= videoPlayer.getDuration()) {
        elapsedTime = videoPlayer.getDuration() - 1;
      }
    }
    return elapsedTime;
  }

  changeTimestamp = (timeToSkip) => {
    const videoPlayer = this.state.videoPlayer;
    if (videoPlayer) {
      axios.put('http://localhost:8080/lobbys/video',
        {
          roomId: this.props.match.params.roomId,
          videoDuration: videoPlayer.getDuration(),
          timeToSkip
        })
        .then(res => {
          console.log(res.data.lobby.StartTime, this.state.startTime);
          this.socket.emit('changeTimestamp');
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  render() {
    let height = window.innerWidth > 1024 ? window.innerHeight * .88 : window.innerHeight * .45;
    let width = window.innerWidth > 1024 ? window.innerWidth * .75 : window.innerWidth;
    let opts = {
      height,
      width
    }
    return (
      <div className='App-header'>
        <Menu widths={3}>
          <Menu.Item>
            <Button primary onClick={this.onLeaveClick}>Leave</Button>
          </Menu.Item>
          <Menu.Item>
            <Searchbar
              onChange={this.onChange}
              onKeyPress={this.onSearchKeyPress}
              value={this.state.searchValue}
            />
          </Menu.Item>
          <Menu.Item>
            <Button.Group>
              <Button icon onClick={() => this.changeTimestamp(-10)} className='video-buttons'>
                <Icon name='backward' />
                <span className='video-button-usage'>Go back 10 seconds</span>
              </Button>
              <Button icon onClick={() => this.changeTimestamp(10)} className='video-buttons'>
                <Icon name='forward' />
                <span className='video-button-usage'>Skip 10 seconds</span>
              </Button>
              <Button icon onClick={this.skipVideo} className='video-buttons'>
                <Icon name='fast forward' />
                <span className='video-button-usage'>Skip Video</span>
              </Button>
            </Button.Group>
          </Menu.Item>
        </Menu>
        <div className='server-browser'>
          <YouTube
            opts={opts}
            onPlay={this.onPlay}
            onReady={this.onReady}
            onEnd={this.onEnd}
            onPause={this.onPause}
          />
        </div>
        <PlayerList
          players={this.props.players}
          toggleChat={this.toggleChat}
          chatType={this.state.chatType}
          chatMessage={this.chatMessage}
          onChange={this.onChange}
          chatInput={this.state.chatInput}
          messages={this.props.messages}
          localMessages={this.props.localMessages}
          inLobby={true}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
