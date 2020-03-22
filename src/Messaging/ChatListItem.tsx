import React, {FC, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import fetchUser from '../../src/redux/effects/messaging';
import {useDispatch, useSelector} from 'react-redux';
import {Store} from '../types';
import {Dispatch} from 'redux';
import {resolveTime} from '../redux/effects/chatList';
// @ts-ignore
import {Bubbles} from 'react-native-loader';
import useOnlineStatus from '../hooks/useOnlineStatus';

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    display: 'flex',
    justifyContent: 'center',
    height: 76,
    flex: 2,
  },
  avatar: {},
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    opacity: 0.7,
  },
  time: {
    fontSize: 12,
    opacity: 0.6,
  },
  notifications: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unread: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

interface Props {
  userId: string;
  user: any;
  item: any;
}

const ChatListItem: FC<Props> = props => {
  const {userId, user, item} = props;

  const store = useSelector(({global: {navigation}}: Store) => ({
    navigation,
  }));

  const {navigation} = store;

  const dispatch = useDispatch();
  const stableDispatch: Dispatch = useCallback(dispatch, [dispatch]);

  useEffect(() => {
    fetchUser(user.username, stableDispatch).then();
  }, [stableDispatch, user.username]);

  const reduxState = useSelector((state: Store) => ({
    user: state.global.chatUsers[userId],
    currentUser: state.authentication.auth,
  }));

  const reduxUser = reduxState.user || {resume: {}};
  const currentUser = reduxState.currentUser;

  const firstName = reduxUser.firstName || '';
  const lastName = reduxUser.lastName || '';

  const name = `${firstName.split('')[0] || ''}${lastName.split('')[0] || ''}`;

  const online = useOnlineStatus(userId);

  if (online && online !== 'online') {
    resolveTime(online);
  }

  const avatarProps = reduxUser.avatarUrl
    ? {
        source: {
          uri: reduxUser.avatarUrl,
        },
      }
    : {title: name.toUpperCase()};

  const messages = item.list || {};

  const unread = Object.values(messages).filter((message: any) => {
    const notMine = message.from !== currentUser.userId;
    return notMine && !message.read;
  });

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Messages', {
          messages: item.list || {},
          initials: name,
          user: reduxUser,
        })
      }
      style={styles.view}>
      <Avatar
        {...avatarProps}
        overlayContainerStyle={{
          backgroundColor: reduxUser.avatarColor || '#2089dc',
        }}
        containerStyle={styles.avatar}
        rounded
        size="medium"
      />
      <View style={styles.description}>
        <View style={styles.flex}>
          <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
          {!unread.length ? (
            <Text>
              {online === 'online' || item.typing ? 'online' : 'Last Seen'}
            </Text>
          ) : (
            <View
              style={[
                styles.notifications,
                {backgroundColor: online === 'online' ? 'red' : '#0050c8'},
              ]}>
              <Text style={styles.unread}>
                {unread.length > 99 ? '99+' : unread.length}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.flex}>
          <Text style={styles.title}>{reduxUser.resume.title}</Text>
          <Text style={styles.time}>
            {online &&
              online !== 'online' &&
              !item.typing &&
              resolveTime(online)}
          </Text>
          {online && item.typing ? <Bubbles size={2} color="#32cd32" /> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ChatListItem;
