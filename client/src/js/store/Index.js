import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/Index";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk))
);
