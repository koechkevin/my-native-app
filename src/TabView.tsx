import React, {FC, useCallback, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {Store} from './types';
import Loading from './components/Loader';
import constants from './redux/constants';
import ChatList from './Messaging/ChatList';
import {Dispatch} from 'redux';
import {getChatList, getUsers} from './redux/effects/chatList';

const FirstRoute = () => <View style={styles.scene} />;

const SecondRoute = () => <View style={styles.scene} />;

const initialLayout = {width: Dimensions.get('window').width};

const Home: FC<any> = props => {
  const {navigation} = props;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Chats'},
    {key: 'second', title: 'My Resume'},
    {key: 'third', title: 'Users'},
  ]);

  const dispatch = useDispatch();
  const stableDispatch: Dispatch = useCallback(dispatch, [dispatch]);
  useEffect(() => {
    stableDispatch({type: constants.NAVIGATION_PROPS, payload: navigation});
  }, [navigation, stableDispatch]);

  const reduxState = useSelector((state: Store) => ({
    currentUser: state.authentication.auth,
    chatList: state.messages.chatlist,
  }));
  const {currentUser} = reduxState;

  useEffect(() => {
    if (currentUser.userId) {
      const ref = getChatList(currentUser.userId, stableDispatch);
      return () => ref.off();
    }
  }, [currentUser, stableDispatch]);

  useEffect(() => {
    getUsers(stableDispatch).then();
  }, [stableDispatch]);

  useEffect(() => {
    dispatch({type: constants.HANDLE_HEADER, payload: true});
  }, [dispatch]);

  const redux = useSelector(({authentication: {authenticating}}: Store) => ({
    authenticating,
  }));

  const renderScene = SceneMap({
    first: ChatList,
    second: SecondRoute,
    third: FirstRoute,
  });

  if (redux.authenticating) {
    return <Loading />;
  }

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={props => (
        <TabBar
          {...props}
          bounces
          activeColor="#0050c8"
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#001429ef',
    color: '#1d1d1d',
    fontSize: 8,
  },
  indicator: {
    backgroundColor: '#0050c8',
  },
});

export default Home;
