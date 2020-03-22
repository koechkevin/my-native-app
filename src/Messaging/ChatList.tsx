import React, {FC, Fragment} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Store} from '../types';
import ChatListItem from './ChatListItem';

const styles = StyleSheet.create({
  scroll: {
    padding: 8,
    paddingTop: 0,
  },
});
const ChatList: FC<any> = () => {
  const reduxState = useSelector((state: Store) => ({
    currentUser: state.authentication.auth,
    chatList: state.messages.chatlist,
  }));
  const {chatList, currentUser} = reduxState;
  return (
    <ScrollView style={styles.scroll}>
      {Object.keys(chatList).map(
        (each: string) =>
          each !== currentUser.userId && (
            <Fragment key={each}>
              <ChatListItem
                item={chatList[each]}
                user={chatList[each].user}
                userId={each}
              />
            </Fragment>
          ),
      )}
    </ScrollView>
  );
};

export default ChatList;
