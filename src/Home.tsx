import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {Store} from './types';
import Login from './Authentication/Login';
import TabView from './TabView';

const Home: FC<any> = props => {
  const store = useSelector(({authentication: {auth}}: Store) => ({
    auth,
  }));

  const {auth} = store;
  return <>{auth.isLoggedIn ? <TabView {...props} /> : <Login {...props} />}</>;
};

export default Home;
