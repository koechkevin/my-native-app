import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

const useKeyboardShown = () => {
  const [state, setState] = useState<any>({
    keyboardOpen: false,
  });
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event =>
        setState({
          event,
          keyboardOpen: true,
        }),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      event =>
        setState({
          event,
          keyboardOpen: false,
        }),
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  });
  return state;
};

export default useKeyboardShown;
