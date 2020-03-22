import * as firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCi7IFa62NyVKkYphH6iB11ZAAy1CXpLco',
  authDomain: 'my-resume-92231.firebaseapp.com',
  databaseURL: 'https://my-resume-92231.firebaseio.com',
  projectId: 'my-resume-92231',
  storageBucket: 'my-resume-92231.appspot.com',
  messagingSenderId: '192732536832',
  appId: '1:192732536832:web:d3730ea70e255eb661b8e5',
  measurementId: 'G-XR6L2HYLTY',
};

firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
