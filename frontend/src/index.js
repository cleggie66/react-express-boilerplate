import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider, Modal } from './context/Modal';
import App from './App';

import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

function Root() {
  return (
    <ModalProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </ReduxProvider>
    </ModalProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
