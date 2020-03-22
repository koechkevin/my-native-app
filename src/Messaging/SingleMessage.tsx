import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {decode} from '../redux/effects/messaging';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {Store} from '../types';
import {database} from '../services/firebase';

const styles = StyleSheet.create({
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  message: {
    display: 'flex',
    minWidth: '100%',
    flexDirection: 'row',
    marginBottom: 12,
  },
  myMessageView: {
    justifyContent: 'flex-end',
  },
  newMessageView: {},
  innerView: {
    padding: 6,
    borderRadius: 8,
    maxWidth: '80%',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  myMessage: {
    backgroundColor: '#72fffd',
  },
  newMessage: {
    backgroundColor: '#fff',
  },
  delivered: {
    fontSize: 8,
    opacity: 0.6,
    marginRight: 4,
  },
  text: {
    fontSize: 14,
  },
  time: {
    fontSize: 10,
    opacity: 0.5,
  },
});
const SingleMessage: FC<any> = props => {
  const {myMessage, message, firebaseId} = props;
  const reduxState = useSelector((state: Store) => ({
    oppositeList: state.messages.oppositeChatlist,
    currentUser: state.authentication.auth,
  }));

  useEffect(() => {
    if (reduxState.currentUser.userId) {
      database
        .ref(
          `/chats/${reduxState.currentUser.userId}/${
            message.from
          }/list/${firebaseId}`,
        )
        .update({read: true});
    }
  }, [message, reduxState.currentUser.userId, firebaseId]);

  const {oppositeList} = reduxState;

  const oppositeFirebaseId = Object.keys(reduxState.oppositeList).find(
    (each: any) => reduxState.oppositeList[each].id === message.id,
  );

  return (
    <View
      style={[
        styles.message,
        myMessage ? styles.myMessageView : styles.newMessageView,
      ]}>
      <View
        style={[
          styles.innerView,
          myMessage ? styles.myMessage : styles.newMessage,
        ]}>
        <Text style={styles.text}>
          {message.encoded ? decode(message.message) : message.message}
        </Text>
        <View style={styles.info}>
          {myMessage && (
            <Text style={styles.delivered}>
              {!oppositeFirebaseId
                ? 'Sending...'
                : oppositeList[oppositeFirebaseId].read
                ? 'Read'
                : 'Delivered'}
            </Text>
          )}
          <Text style={styles.time}>
            {moment(message.createdAt).format('HH:MM')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SingleMessage;
