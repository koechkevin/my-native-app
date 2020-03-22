import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import constants from '../redux/constants';
import {createMessage} from '../redux/effects/messaging';
import {Store} from '../types';
import {useSafeArea} from 'react-native-safe-area-context';
import Icon from './../../src/components/Icon';
import {faSmile, faCameraAlt} from '@fortawesome/pro-solid-svg-icons';
import {faPaperclip} from '@fortawesome/pro-regular-svg-icons';
import useKeyboardShown from '../hooks/useKeyboardShown';
import {Dispatch} from 'redux';
import UserTitle from './UserTitle';
import {database} from '../services/firebase';
import useOnlineStatus from '../hooks/useOnlineStatus';
import {resolveTime} from '../redux/effects/chatList';
import {Icon as IonIcon} from 'react-native-elements';
import SingleMessage from './SingleMessage';
import moment from 'moment';

interface Message {
  read: boolean;
  message: string;
  id: string;
  createdAt: string;
  from: string;
  to: string;
  encoded?: boolean;
}
interface Props {
  navigation: any;
  route: {
    params: {
      user: any;
      initials: string;
    };
  };
}

const Messages: FC<Props> = props => {
  const {
    navigation,
    route: {params},
  } = props;
  const {initials, user} = params;

  const [messages, setMessages] = useState<any>({});

  const [typing, setTyping] = useState('');
  const dispatch = useDispatch();

  const online = useOnlineStatus(user.id);

  const lastSeen =
    online === 'online' ? 'Online' : online ? resolveTime(online) : '';

  const reduxState = useSelector((state: Store) => ({
    currentUser: state.authentication.auth,
  }));

  const insets = useSafeArea();

  const stableDispatch: Dispatch = useCallback(dispatch, [dispatch]);
  useEffect(() => {
    stableDispatch({
      type: constants.ON_GO_BACK,
      payload: () => navigation.goBack(),
    });
    return () => {
      stableDispatch({
        type: constants.ON_GO_BACK,
        payload: () => {},
      });
    };
  }, [navigation, stableDispatch]);

  const {currentUser} = reduxState;

  useEffect(() => {
    const myId = currentUser.userId;
    const ref = database.ref(`/chats/${myId}/${user.id}/typing`);
    ref.on('value', snapshot => {
      const type = snapshot.val();
      setTyping(type || '');
    });
    return () => ref.off();
  });

  useEffect(() => {
    const myId = currentUser.userId;
    const ref = database.ref(`/chats/${myId}/${user.id}/list`);
    ref.on('value', snapshot => {
      const value = snapshot.val() || {};
      setMessages(value);
    });
    return () => ref.off();
  }, [currentUser.userId, user.id]);

  useEffect(() => {
    stableDispatch({
      type: constants.HANDLE_PAGE_TITLE,
      payload: (
        <UserTitle
          typing={typing}
          user={user}
          lastSeen={lastSeen}
          initials={initials}
        />
      ),
    });
    return () => {
      stableDispatch({
        type: constants.HANDLE_PAGE_TITLE,
        payload: <Text style={styles.title}>My Resume</Text>,
      });
    };
  }, [stableDispatch, lastSeen, user, initials, typing]);

  useEffect(() => {
    const myId = currentUser.userId;
    const ref = database.ref(`/chats/${user.id}/${myId}/list`);
    ref.on('value', snapshot => {
      const value = snapshot.val() || {};
      stableDispatch({type: constants.LOAD_OPPOSITE_CHAT_LIST, payload: value});
    });
    return () => ref.off();
  }, [stableDispatch, currentUser, user]);

  const {keyboardOpen, event} = useKeyboardShown();

  const keyboardHeight = (event && event.endCoordinates.height) || 0;

  const windowHeight = Dimensions.get('window').height;

  const [text, setMessage] = useState('');

  const onChangeText = (message: string) => {
    setMessage(message);
    database
      .ref(`/chats/${user.id}/${currentUser.userId}/typing`)
      .set(message)
      .then();
  };

  const onSend = () => {
    if (currentUser.userId && user) {
      const id = `${currentUser.userId}-${+new Date()}-${user.id}`;
      setMessages((m: any) => ({
        ...m,
        newMessage: {
          from: currentUser.userId,
          to: user.id,
          id,
          message: text,
          read: false,
          encoded: false,
        },
      }));
      createMessage({
        myId: currentUser.userId,
        recipientId: user.id,
        message: text,
        id,
        me: currentUser,
        recipient: {...user, userId: user.id},
      }).then();
      database
        .ref(`/chats/${user.id}/${currentUser.userId}/typing`)
        .set('')
        .then();
      setMessage('');
    }
  };

  const style = {
    paddingTop: 0,
    paddingBottom: insets.bottom + 8,
    paddingLeft: insets.left + 8,
    paddingRight: insets.left + 8,
    height:
      Platform.OS === 'ios' && keyboardOpen
        ? windowHeight - (keyboardHeight + insets.top + 48)
        : '100%',
  };

  const values: any[] = Object.values(messages);
  const unreadIndex = values.findIndex((message: any) => {
    const toMe = message.to === currentUser.userId;
    return toMe && !message.read;
  });

  const unread = values.length - unreadIndex - 1;

  return (
    <View style={[styles.view, style]}>
      <FlatList
        inverted
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={Object.keys(messages).reverse()}
        keyExtractor={item => item}
        renderItem={({item, index}: {item: string; index: number}) => {
          const message: Message | any = messages[item];
          return (
            <>
              <SingleMessage
                key={message.id}
                myMessage={message.from === currentUser.userId}
                message={message}
                firebaseId={item}
              />
              {index > 0 && index === unread && (
                <View style={styles.unread}>
                  <Text style={styles.unreadText}>Unread Messages</Text>
                </View>
              )}
            </>
          );
        }}
      />
      <View style={styles.pad}>
        <View style={styles.inputArea}>
          <Icon color="#808080" style={styles.icon} icon={faSmile} />
          <TextInput
            multiline
            value={text}
            onChangeText={onChangeText}
            style={styles.input}
            placeholder="Type a message"
          />
          <Icon color="#808080" style={styles.icon} icon={faPaperclip} />
          <Icon color="#808080" style={styles.icon} icon={faCameraAlt} />
        </View>
        <TouchableOpacity
          disabled={!text.trim()}
          onPress={onSend}
          style={[styles.send, {opacity: !text.trim() ? 0.4 : 1}]}>
          <View>
            <IonIcon color="#fff" name="send" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#001429ef',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginBottom: 6,
  },
  unread: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  unreadText: {
    color: '#0050c8',
    shadowColor: '#000',
    fontWeight: 'bold',
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#72fffd',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  pad: {
    padding: 8,
    paddingTop: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    width: '100%',
    padding: 8,
  },
  title: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
  input: {
    flex: 1,
    maxHeight: 96,
    minHeight: 24,
    lineHeight: 18,
    fontSize: 16,
    alignSelf: 'center',
  },
  send: {
    backgroundColor: '#0050c8',
    width: 50,
    alignSelf: 'flex-end',
    height: 50,
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputArea: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '85%',
    marginTop: 8,
    minHeight: 48,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 4,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default Messages;
