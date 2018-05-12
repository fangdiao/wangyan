import { createAction } from 'redux-actions';
import { request } from "../utils/helper";

export default {
  'siginIn': createAction('SIGIN_IN', reqData => request('/user/siginin', reqData, 'post'), reqData => reqData),
};