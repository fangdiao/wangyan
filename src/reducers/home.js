import { handleActions } from 'redux-actions';

const initialState = {
  homeData: []
};

export default handleActions({
  'TEST': (state, action) => {
    if (!action.error) {
      return state;
    }
    return state;
  }
}, initialState)