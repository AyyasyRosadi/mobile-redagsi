import React from 'react';
import Route from './src/router/Route';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { injectStore } from './src/api/http';
injectStore(store)

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  )
}

