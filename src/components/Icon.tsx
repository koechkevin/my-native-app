import React, {FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'transparent',
    width: 32,
    height: 32,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

interface Props {
  onPress?: () => void;
  icon: any;
  style?: any;
  color?: string;
}
const Icon: FC<Props> = props => {
  const {icon, style, ...restProps} = props;
  return (
    <View style={{...styles.view, ...style}}>
      <FontAwesomeIcon icon={icon} {...restProps} />
    </View>
  );
};

export default Icon;
