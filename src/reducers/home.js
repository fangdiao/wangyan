import { handleActions } from 'redux-actions';

const initialState = {
  itemData: []
};

export default handleActions({
  'GET_ITEM': (state, action) => {
    if (!action.error) {
      const { index } = action.meta;
      let newState = state;
      let { itemData } = newState;
      if (index === 0) {
        itemData = [];
      }
      const newItemData = [ ...itemData, ...action.payload.data ];
      newState = { ...newState, itemData: newItemData };
      return newState;
    }
    return state;
  },
  'ITEM_LIKE': (state, action) => {
    if (!action.error) {
      const { payload, meta } = action;
      if (payload.success) {
        let newState = state;
        const { itemData } = newState;
        const { time } = meta;
        const newItemData = itemData.map(i => {
          if (i.time === time) {
            delete meta.time;
            i.like = [ ...i.like, meta ];
          }
          return i;
        });
        newState = { ...newItemData, itemData: newItemData };
        return newState;
      }
      return state;
    }
    return state;
  },
  'ITEM_CANCLE_LIKE': (state, action) => {
    if (!action.error) {
      const { payload, meta } = action;
      if (payload.success) {
        let newState = state;
        const { itemData } = newState;
        const { time, accountNumber } = meta;
        const newItemData = itemData.map(i => {
          if (i.time === time) {
            i.like = i.like.filter(i => i.accountNumber !== accountNumber);
          }
          return i;
        });
        newState = { ...newItemData, itemData: newItemData };
        return newState;
      }
      return state;
    }
    return state;
  },
  'ITEM_COMMENT': (state, action) => {
  if (!action.error) {
    const { payload, meta } = action;
    if (payload.success) {
      let newState = state;
      const { itemData } = newState;
      const { time } = meta;
      const newItemData = itemData.map(i => {
        if (i.time === time) {
          delete meta.time;
          i.comment = [ ...i.comment, meta ];
        }
        return i;
      });
      newState = { ...newItemData, itemData: newItemData };
      return newState;
    }
    return state;
  }
  return state;
  },
  'ABOUT_ME': (state, action) => {
    if (!action.error) {
      const aboutMe = action.payload.data;
      let newState = state;
      newState = { ...newState, itemData: aboutMe };
      return newState;
    }
    return state;
  },
  'USER_DETAIL': (state, action) => {
  if (!action.error) {
    const { release } = action.payload;
    let newState = state;
    newState = { ...newState, itemData: release };
    return newState;
  }
  return state;
},
}, initialState)