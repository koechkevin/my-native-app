import React, {FC, ReactNode, Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {Item} from '../types';

interface Props {
  items: Item[];
}
const MyMenu: FC<Props> = props => {
  const {items, children} = props;
  let _menu: any = null;
  const setMenuRef = (ref: any) => {
    _menu = ref;
  };

  const hideMenu = () => {
    _menu.hide();
  };

  const showMenu = () => {
    _menu.show();
  };

  return (
    <View style={styles.menu}>
      <Menu
        ref={setMenuRef}
        button={<Text onPress={showMenu}>{children}</Text>}>
        {items.map((item: Item, index: number) => (
          <Fragment key={index}>
            <MenuItem
              textStyle={{fontSize: 16}}
              style={styles.item}
              {...item.extraItemProps}
              onPress={(...args) => {
                item.onPress(...args);
                hideMenu();
              }}>
              {item.label}
            </MenuItem>
            {item.divideAfter && <MenuDivider />}
          </Fragment>
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    minWidth: 160,
    height: 40,
  },
});

export default MyMenu;
