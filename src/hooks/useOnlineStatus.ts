import {useEffect, useState} from 'react';
import {database} from '../services/firebase';
import moment from 'moment';

const useOnlineStatus = (userId: string) => {
  const [online, setOnline] = useState('');
  useEffect(() => {
    if (userId) {
      const ref = database.ref(`/users/${userId}/status`);
      ref.on('value', snap => {
        const value = snap.val();
        setOnline(value || '');
      });
      return () => ref.off();
    }
  }, [userId]);
  return online;
};

export const setOnlineStatus = (
  userId: string,
  status: 'online' | 'offline',
) => {
  if (userId) {
    const newStatus = status === 'online' ? 'online' : moment().format();
    database.ref(`/users/${userId}/status`).set(newStatus);
  }
};

export default useOnlineStatus;
