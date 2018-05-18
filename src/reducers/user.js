import { handleActions } from 'redux-actions';
import { message } from 'antd';

const initialState = {};

export default handleActions({
  'SIGN_IN': (state, action) => {
    if (!action.error) {
      if (!action.payload.success) {
        message.error('账号或密码错误');
        return state;
      }
      const { data } = action.payload;
      delete data.password;
      localStorage.setItem('wangyan', JSON.stringify(data));
      state = data;
      return state;
    }
    return state;
  },
  'INFO': (state, action) => {
    if (!action.error) {
      let newState = state;
      const data = action.meta;
      localStorage.setItem('wangyan', JSON.stringify(data));
      newState = data;
      return newState;
    }
    return state;
  },
  'SIGN_IN_LOCAL': (state, action) => {
    if (!action.error) {
      const user = localStorage.getItem('wangyan');
      state = user ? JSON.parse(user) : {};
      return state;
    }
    return state;
  },
  'SIGN_OUT': (state, action) => {
    if (!action.error) {
      localStorage.removeItem('wangyan');
      state = {};
      return state;
    }
    return state;
  },
  'GET_MESSAGE': (state, action) => {
    if (!action.error) {
      const message = action.payload.data;
      let newState = state;
      newState = { ...newState, message };
      return newState;
    }
    return state;
  },
  'ADD_FRIEND': (state, action) => {
    if (!action.error) {
      let newState = state;
      const { time, agree } = action.meta;
      const newFriend = action.meta.friend;
      console.log(action.meta);
      let { message, friend } = newState;
      const newMessage = message.map(i => {
        if (i.time === time) {
          i.agree = agree;
        }
        return i;
      });
      if (agree) {
        friend = [ ...friend, newFriend ];
      }
      newState = { ...newState, message: newMessage, friend };
      localStorage.setItem('wangyan', JSON.stringify(newState));
      return newState;
    }
    return state;
  },
  'DELETE_FRIEND': (state, action) => {
  if (!action.error) {
    let newState = state;
    const deleteFriend = action.meta.friend;
    let { friend } = newState;
    let newFriend = friend.filter(i => i.accountNumber !== deleteFriend.accountNumber);
    newState = { ...newState, friend: newFriend };
    localStorage.setItem('wangyan', JSON.stringify(newState));
    return newState;
  }
  return state;
},
}, initialState)