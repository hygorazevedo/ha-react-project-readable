import './index.css';
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import RegisterServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
RegisterServiceWorker();
