import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import {store, persistor} from './app/store';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="954820964588-l8ba8pbqa49riqctv9fa6ckrt1dbul77.apps.googleusercontent.com">
  <React.StrictMode>

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    < App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();
