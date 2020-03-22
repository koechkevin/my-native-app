import {StyleSheet} from 'react-native';

const input = {
  borderBottomWidth: 1,
  padding: 8,
  height: 32,
  lineHeight: 18,
  borderBottomColor: 'lightgray',
}
const login = StyleSheet.create({
  view: {
    display: 'flex',
    minHeight: 800,
    justifyContent: 'center',
    padding: 16,
    fontSize: 16,
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  password: {
    position: 'relative',
  },
  forgotPassword: {
    color: '#0050c8',
    fontWeight: 'bold',
    marginRight: 32,
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
  login: {
    display: 'flex',
    height: 240,
    justifyContent: 'space-between',
  },
  input,
  focus: {
    ...input,
    borderBottomColor: '#0050c8',
    borderBottomWidth: 2,
  },
  error: {
    ...input,
  },
  button: {
    backgroundColor: '#0050c8',
    borderRadius: 8,
    marginTop: 8,
  },
});

const app = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-around',
  },
  head: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  },
});

const styles = {
  login,
  app,
};

export default styles;
