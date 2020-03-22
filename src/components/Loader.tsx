import React, {FC} from 'react';
// @ts-ignore
import {Bubbles} from 'react-native-loader';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 20, 41, 0.5)',
  },
});
const Loading: FC<any> = () => {
  return (
    <View style={styles.view}>
      <Bubbles size={6} color="#0050c8" />
    </View>
  );
};

export default Loading;
