import React, {FC, useEffect, useState} from 'react';
import {View, TextInput, Text, ScrollView, Linking} from 'react-native';
import {Button} from 'react-native-elements';
import styles from '../styles';
import Icon from '../components/Icon';
import {faEye, faEyeSlash} from '@fortawesome/pro-light-svg-icons';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {authenticateUser, loginAction} from '../redux/effects/authentication';
import constants from '../redux/constants';

const {login} = styles;

const Login: FC<any> = props => {
  const {navigation} = props;
  const {navigate} = navigation;

  const [focus, setFocus] = useState({
    username: false,
    password: false,
  });

  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: constants.HANDLE_HEADER, payload: false});
  }, [dispatch]);

  const [securePassword, setSecurePassword] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onFocus = (name: 'username' | 'password') => {
    setFocus(s => ({...s, [name]: true}));
  };

  const onPress = async () => {
    try {
      setLoading(true);
      await loginAction({username, password});
      setLoading(false);
      await authenticateUser(dispatch);
    } catch (error) {
      console.log('======>', error);
      setLoading(false);
    }
  };

  const onBlur = (name: 'username' | 'password') => {
    setFocus(s => ({...s, [name]: false}));
  };

  return (
    <ScrollView contentContainerStyle={login.view}>
      <View style={login.login}>
        <TextInput
          onFocus={() => onFocus('username')}
          onChangeText={setUsername}
          onBlur={() => onBlur('username')}
          style={focus.username ? login.focus : login.input}
          placeholder="Username"
        />
        <View style={login.password}>
          <TextInput
            onFocus={() => onFocus('password')}
            onBlur={() => onBlur('password')}
            onChangeText={setPassword}
            style={focus.password ? login.focus : login.input}
            secureTextEntry={securePassword}
            placeholder="Password"
          />
          <Icon
            onPress={() => setSecurePassword(value => !value)}
            style={login.icon}
            icon={securePassword ? faEyeSlash : faEye}
          />
        </View>
        <View style={login.link}>
          <Text
            onPress={() => Linking.openURL('https://google.com')}
            style={login.forgotPassword}>
            Forgot Password?
          </Text>
          <Text
            onPress={() => navigate('Request')}
            style={login.forgotPassword}>
            Register
          </Text>
        </View>
        <Button
          loading={loading}
          buttonStyle={login.button}
          title={'Login'}
          onPress={onPress}
        />
      </View>
    </ScrollView>
  );
};

export default Login;
