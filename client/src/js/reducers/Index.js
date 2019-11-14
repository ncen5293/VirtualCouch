import { SET_ROOM, GET_ROOMS, GET_USERS, GET_MESSAGE, GET_LOCAL_MESSAGE } from "../constants/action-types";

const initialState = {
  articles: [],
  remoteArticles: [],
  loggedIn: false,
  username: '',
  roomId: 0,
  lobbyList: [],
  players: [],
  messages: [],
  localMessages: []
};

const rootReducer = (state = initialState, action) => {
  if (action.type === SET_ROOM) {
    return Object.assign({}, state, {
      roomId: action.payload
    });
  }

  if (action.type === GET_ROOMS) {
    return Object.assign({}, state, {
      lobbyList: action.payload
    });
  }

  if (action.type === GET_USERS) {
    return Object.assign({}, state, {
      lobbyList: action.payload
    });
  }

  if (action.type === GET_MESSAGE) {
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload)
    });
  }

  if (action.type === GET_LOCAL_MESSAGE) {
    return Object.assign({}, state, {
      localMessages: state.localMessages.concat(action.payload)
    });
  }
  return state;
};

export default rootReducer;
