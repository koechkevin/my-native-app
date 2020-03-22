import {ReactNode} from 'react';

export interface Action {
  type: string;
  payload?: any;
}

export interface Item {
  label: string | ReactNode;
  onPress: (...args: any) => void;
  extraItemProps?: any;
  divideAfter?: boolean;
}

export interface GlobalState {
  showHeader: boolean;
  chatUsers: any;
  users: any[];
  user: any;
  navigation: any;
  title: ReactNode;
  headerRightItems: Item[];
  onGoBack: () => void;
}

export interface UseObject {
  email: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface NewMessage {
  myId: string;
  recipientId: string;
  message: string;
  id: string;
  recipient: UseObject;
  me: UseObject;
}

export interface MessagingState {
  chatlist: any;
  oppositeChatlist: any;
}

export interface Authentication {
  auth: {
    isLoggedIn: boolean;
    email: string;
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  authenticating: boolean;
}

export interface Store {
  global: GlobalState;
  authentication: Authentication;
  messages: MessagingState;
}
