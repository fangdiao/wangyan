import { createAction } from 'redux-actions';
import { request } from "../utils/helper";

export default {
  // 登录
  'siginIn': createAction('SIGN_IN', reqData => request('/user/siginin', reqData, 'post'), reqData => reqData),
  // 注册
  'siginUp': createAction('SIGIN_UP', reqData => request('/user/siginup', reqData, 'post'), reqData => reqData),
  // 填写信息
  'info': createAction('INFO', reqData => request('/user/info', reqData, 'post'), reqData => reqData),
  // localstrage登录
  'signINLocal': createAction('SIGN_IN_LOCAL', reqData => reqData, reqData => reqData),
  // 退出
  'signOut': createAction('SIGN_OUT', reqData => reqData, reqData => reqData),
  // 发布
  'release': createAction('RELEASE', reqData => request('/item/release', reqData, 'post'), reqData => reqData),
  // 获取我的消息
  'getMessage': createAction('GET_MESSAGE', reqData => request('/user/getmessage', reqData, 'post'), reqData => reqData),
  // 同意或者拒绝添加好友
  'addFriend': createAction('ADD_FRIEND', reqData => request('/user/addfriend', reqData, 'post'), reqData => reqData),
  // 删除好友
  'deleteFriend': createAction('DELETE_FRIEND', reqData => request('/user/deletefriend', reqData, 'post'), reqData => reqData),

};