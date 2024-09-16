import { Events } from '@types';
import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

export const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      EventRegister.emit(Events.NEXT_APP_STATE, { nextAppState });
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        /* empty */
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    appStateVisible,
    setAppStateVisible,
  };
};
