import {applyMiddleware, compose, createStore} from 'redux'
import createRootReducer from './reducers'
import thunk from "redux-thunk";


export default createStore(
  createRootReducer,
  compose(
    applyMiddleware(
      thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ),
)
