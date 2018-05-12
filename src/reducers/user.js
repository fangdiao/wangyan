import { handleActions } from 'redux-actions';

const initialState = {
  user: {}
};

export default handleActions({
  'SIGIN_IN': (state, action) => {
    if (!action.error) {
      const { data } = action.payload;
      state.user = data;
      return state;
    }
    return state;
  }
}, initialState)