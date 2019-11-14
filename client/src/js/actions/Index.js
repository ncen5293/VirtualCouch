import { SET_ROOM, GET_ROOMS, GET_USERS, GET_MESSAGE, GET_LOCAL_MESSAGE } from "../constants/action-types";
import axios from 'axios';

export const setRoom = (payload) => {
  return { type: SET_ROOM, payload };
}

export const getUsers = (payload) => {
  return { type: GET_USERS, payload };
}

export const getMessage = (payload) => {
  return { type: GET_MESSAGE, payload };
}

export const getLocalMessage = (payload) => {
  return { type: GET_LOCAL_MESSAGE, payload };
}

export const getRooms = () => {
  return (dispatch) => {
    return axios.get('http://localhost:8080/lobbys/lobby', {params: { roomId: '' }})
      .then(res => {
        dispatch({ type: GET_ROOMS, payload: res.data });
      })
      .catch(error => {
        console.error(error)
      })
  }
}
