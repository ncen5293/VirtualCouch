import { ADD_ARTICLE, STORE_USER } from "../constants/action-types";

export const storeUser = (payload) => {
  return { type: 'STORE_USER', payload };
}

export const addArticle = (payload) => {
  return { type: "ADD_ARTICLE", payload }
};

export const getData = () => {
  return (dispatch) => {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });
      });
  };
}
