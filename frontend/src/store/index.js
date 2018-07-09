import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import reducers from '../reducers/index';
import ReduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)))
