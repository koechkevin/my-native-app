import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import RootApp from './src';
import store from './src/redux';

const App = () => {
  useEffect(() => {});
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
};

export default App;
