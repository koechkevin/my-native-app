import React, {FC} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import globalStyles from '../src/styles';

const {login} = globalStyles;

const styles = StyleSheet.create({
  view: {
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    minHeight: 800,
  },
  content: {
    height: 320,
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: '#1d1d1d',
  },
});
const RequestRegister: FC<any> = () => {
  return (
    <ScrollView>
      <View style={styles.view}>
        <View style={styles.content}>
          <Text style={styles.text}>
            Enter Your Email address below and we will send you an email with a
            link to register.
          </Text>
          <TextInput style={login.input} placeholder="Enter your Email" />
          <Button
            buttonStyle={login.button}
            title="Send"
            onPress={console.log}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default RequestRegister;
