import {
  applyMiddleware,
  createStore
} from 'redux';
import reducers from '../reducers/index';
import ReduxThunk from 'redux-thunk';

const middleware = applyMiddleware(ReduxThunk)
export const store = createStore(reducers, middleware)
