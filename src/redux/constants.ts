const constants = {
  HANDLE_HEADER: 'show or hide the header',
  LOGIN_LOADING: 'login request loading',
  LOGIN_FAILED: 'login failed',
  AUTH_KEY_TOKEN: 'AUTH_KEY_TOKEN',
  AUTHENTICATING: 'checking token validity from local storage',
  AUTHENTICATE: 'load current user details',
  HANDLE_HEADER_RIGHT: 'header right',
  LOAD_CHAT_LIST: 'load chat list',
  LOAD_MESSAGES: 'load messages',
  ADD_CHAT: 'add chat to a list',
  LOAD_USER_DATA: "load user's data",
  LOAD_ALL_USERS: 'loads all the users from the main database',
  NAVIGATION_PROPS: 'loads navigation props from tab view',
  LOAD_OPPOSITE_CHAT_LIST: 'load chat list on the other end',
  HANDLE_PAGE_TITLE:
    'Some times I want a specific name on the title but default to My Resume',
  ON_GO_BACK:
    'some times you may want the back button take you to a particular route and not necessarily the previous. Provide a function for this on every page',
};

export default constants;
