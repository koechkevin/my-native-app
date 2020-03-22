import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

const useAppState = () => {
  const [appState, setAppState] = useState(() => AppState.currentState);
  useEffect(() => {
    AppState.addEventListener('change', nextState => setAppState(nextState));
    return () =>
      AppState.removeEventListener('change', nextState =>
        setAppState(nextState),
      );
  }, []);
  return appState;
};

export default useAppState;
