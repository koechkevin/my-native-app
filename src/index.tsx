import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RequestRegister from '../Authentication/RequestRegister';
import {useDispatch, useSelector} from 'react-redux';
import {Store} from './types';
import {authenticateUser} from './redux/effects/authentication';
import Home from './Home';
import Messages from './Messaging/Messages';
import Header from './components/Header';
import useAppState from './hooks/useAppState';
import {setOnlineStatus} from './hooks/useOnlineStatus';

const Stack = createStackNavigator();
const {Screen, Navigator} = Stack;

const RootApp = () => {
  const store = useSelector(
    ({global: {showHeader}, authentication: {auth}}: Store) => ({
      showHeader,
      auth,
    }),
  );

  const {showHeader, auth} = store;

  const dispatch = useDispatch();

  useEffect(() => {
    authenticateUser(dispatch).then();
  }, [dispatch]);

  const appState = useAppState();

  useEffect(() => {
    if (auth.isLoggedIn && auth.userId) {
      setOnlineStatus(
        auth.userId,
        appState === 'active' ? 'online' : 'offline',
      );
    }
  }, [auth, appState]);

  const options = {
    header: (props: any) => <Header {...props} />,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator
          screenOptions={{
            headerShown: showHeader,
          }}
          initialRouteName={'Home'}>
          <Screen name="Home" options={options} component={Home} />
          <Screen name="Request" component={RequestRegister} />
          <Screen name="Messages" options={options} component={Messages} />
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootApp;
