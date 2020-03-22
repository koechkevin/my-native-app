import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Store} from '../types';
import {faLongArrowLeft} from '@fortawesome/pro-solid-svg-icons';
import Icon from './Icon';
import {faEllipsisV} from '@fortawesome/pro-regular-svg-icons';
import Menu from './Menu';
import {useSafeArea} from 'react-native-safe-area-context';
import {logout} from '../redux/effects/authentication';
import {setOnlineStatus} from '../hooks/useOnlineStatus';

const styles = StyleSheet.create({
  view: {
    height: 64,
    backgroundColor: '#001429',
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Header: FC<any> = props => {
  const store = useSelector(
    ({
      global: {showHeader, title, navigation, headerRightItems, onGoBack},
      authentication: {
        auth: {userId},
      },
    }: Store) => ({
      showHeader,
      title,
      navigation,
      headerRightItems,
      onGoBack,
      currentUserId: userId,
    }),
  );

  const insets = useSafeArea();
  const dispatch = useDispatch();
  const safeStyle = {
    paddingTop: insets.top + 16,
    height: 64 + insets.top,
  };
  const {title, navigation, headerRightItems, onGoBack, currentUserId} = store;
  const items = [
    {
      label: 'My Profile',
      onPress: console.log,
    },
    ...headerRightItems,
    {
      label: 'Settings',
      onPress: console.log,
    },
    {
      label: 'Logout',
      onPress: () => {
        if (currentUserId) {
          setOnlineStatus(currentUserId, 'offline');
        }
        logout(dispatch).then(() => navigation.navigate('Home'));
      },
    },
  ];

  return (
    <View style={[styles.view, safeStyle]}>
      <View style={styles.left}>
        {props.navigation.canGoBack() && (
          <TouchableOpacity onPress={onGoBack}>
            <Icon color="#fff" icon={faLongArrowLeft} />
          </TouchableOpacity>
        )}
        <View>{title}</View>
      </View>
      <View>
        <Menu items={items}>
          <Icon color="#fff" icon={faEllipsisV} />
        </Menu>
      </View>
    </View>
  );
};

export default Header;
