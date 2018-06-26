import {
  applyMiddleware,
  createStore
} from 'redux';
import reducers from '../reducers';
import ReduxThunk from 'redux-thunk';

const middleware = applyMiddleware(ReduxThunk)
export const store = createStore(reducers, middleware)
