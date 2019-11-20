const { io } = require('../server');
const { LobbyModel } = require("../routes/lobbies");
// const { router, connection, LobbyModel } = require("../routes/lobbies");

io.on('connection', (socket) => {
  console.log('connected');

  const leavePreviousRooms = () => {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      if (room !== 'world') {
        socket.leave(room);
      }
    })
  }

  const joinCurrentRoom = (roomName, screenName) => {
    socket.join(roomName, () => {
      if (screenName === null || screenName === undefined) {
        socket.name = 'Player';
      } else {
        socket.name = screenName;
      }

      if (socket.currentRoom && roomName !== 'world' || !socket.currentRoom) {
        socket.currentRoom = roomName;
      }

      const roomInfo = {
        players: getAllPlayers(Object.keys(io.sockets.adapter.rooms[roomName].sockets)),
        roomName
      }

      if (roomName !== 'world') {
        const message = {
          where: roomName,
          name: screenName,
          time: getCurrentTime(),
          mess: 'joined the lobby'
        }
        io.in(roomName).emit('chatMessage', message);
      }

      io.in(roomName).emit('updateRoom', roomInfo);
      io.in('world').emit('updateLobbyList');
    })
  }

  const getAllPlayers = (playerIds) => {
    return playerIds.map((playerId, i) => io.sockets.connected[playerId].name);
  }

  const toTwoDigitString = (number) => {
    if (number < 10) {
      number = '0' + number.toString();
    }
    return number;
  }

  socket.on('joinRoom', (joinInfo) => {
    leavePreviousRooms();
    joinCurrentRoom(joinInfo.roomName, joinInfo.screenName);
  });

  socket.on('updatePlayerName', (updatedName) => {
    socket.name = updatedName;
    const roomName = socket.currentRoom;
    const roomInfo = {
      players: getAllPlayers(Object.keys(io.sockets.adapter.rooms[roomName].sockets)),
      roomName
    }
    io.in(roomName).emit('updateRoom', roomInfo);
  });

  const getCurrentTime = () => {
    const date = new Date();
    const min = toTwoDigitString(date.getMinutes());
    const sec = toTwoDigitString(date.getSeconds());
    return `${date.getHours()}:${min}:${sec}`;
  }

  socket.on('chatMessage', (message) => {
    message.name = socket.name;
    message.time = getCurrentTime();
    if (message.where === 'world') {
      io.in('world').emit('chatMessage', message);
    } else {
      const roomName = socket.currentRoom;
      io.in(roomName).emit('chatMessage', message);
    }
  });

  socket.on('enqueueMessage', (message) => {
    const roomName = socket.currentRoom;
    io.in(roomName).emit('enqueueMessage', message);
  });

  socket.on('getYoutubeData', () => {
    const roomName = socket.currentRoom;
    io.in(roomName).emit('getYoutubeData');
  })

  socket.on('getNextYoutubeData', () => {
    const roomName = socket.currentRoom;
    io.in(roomName).emit('getNextYoutubeData');
  })

  socket.on('changeTimestamp', () => {
    const roomName = socket.currentRoom;
    io.in(roomName).emit('changeTimestamp');
  })

  socket.on('pauseVideo', () => {
    const roomName = socket.currentRoom;
    io.in(roonName).emit('pauseVideo');
  })

  socket.on('disconnect', () => {
    const roomName = socket.currentRoom;
    const user = socket.name;
    if (roomName && roomName !== 'world') {
      updateLobbyCount(roomName, user);
      const message = {
        where: roomName,
        name: user,
        time: getCurrentTime(),
        mess: 'left the lobby'
      }
      io.in(roomName).emit('chatMessage', message);
    }
    if (io.sockets.adapter.rooms[roomName] != undefined) {
      const roomInfo = {
        players: getAllPlayers(Object.keys(io.sockets.adapter.rooms[roomName].sockets)),
        roomName
      }
      io.in(roomName).emit('updateRoom', roomInfo);
    }
    delete socket.currentRoom;
    console.log(`${user} disconnected`);
  });

  const updateLobbyCount = (roomId, user) => {
    LobbyModel.findOne({ "RoomId": roomId },
      (err, lobby) => {
        if (err) {
          console.log(err);
        }
        if (!lobby) {
          console.log('lobby does not exist!');
        } else if (lobby.Users.length === 1 && lobby.Users[0] === user) {
          LobbyModel.findOneAndDelete(
            {
              "RoomId": roomId
            },
            (err, lobby) => {
              if (err) {
                console.log(err);
              }
              console.log(lobby);
            }
          )
        } else {
          for (let i=0; i< lobby.Users.length; i++) {
            if (lobby.Users[i] === user) {
              lobby.Users.splice(i, 1);
              break;
            }
          }
          console.log(lobby);
          lobby.save((err) => {
            if (err) {
              console.log(err);
            }
          });
        }
    });
  }
})
