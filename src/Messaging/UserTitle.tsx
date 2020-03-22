import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';

interface Props {
  user: any;
  initials: string;
  lastSeen: string;
  typing: string;
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  description: {
    marginLeft: 16,
    display: 'flex',
    justifyContent: 'center',
  },
  lastSeen: {
    color: '#fff',
    lineHeight: 24,
  },
});
const UserTitle: FC<Props> = props => {
  const {user, lastSeen, initials, typing} = props;

  const avatarProps = user.avatarUrl
    ? {
        source: {
          uri: user.avatarUrl,
        },
      }
    : {title: initials.toUpperCase()};

  return (
    <View style={styles.view}>
      <Avatar
        {...avatarProps}
        overlayContainerStyle={{
          backgroundColor: user.avatarColor || '#2089dc',
        }}
        rounded
        size="small"
      />
      <View style={styles.description}>
        <Text style={styles.name}>
          {`${user.firstName || ''} ${user.lastName || ''}`}
        </Text>
        <Text style={[styles.lastSeen]}>
          {typing
            ? 'typing...'
            : lastSeen === 'Online'
            ? 'online'
            : `last seen ${lastSeen}`}
        </Text>
      </View>
    </View>
  );
};

export default UserTitle;
