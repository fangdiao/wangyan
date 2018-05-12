import { createAction } from 'redux-actions';
import { request } from "../utils/helper";

export default {
  'test': createAction('TEST', reqData => request('/user/siginin', reqData, 'post'), reqData => reqData),
};