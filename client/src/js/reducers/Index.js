import { ADD_ARTICLE, DATA_LOADED, STORE_USER, SET_ROOM } from "../constants/action-types";

const initialState = {
  articles: [],
  remoteArticles: [],
  loggedIn: false,
  username: '',
  roomId: 0
};

const rootReducer = (state = initialState, action) => {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }

  if (action.type === STORE_USER) {
    return Object.assign({}, state, {
      username: action.payload
    });
  }

  if (action.type === SET_ROOM) {
    return Object.assign({}, state, {
      roomId: action.payload
    });
  }
  return state;
};

export default rootReducer;
