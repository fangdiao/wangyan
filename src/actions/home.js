import { createAction } from 'redux-actions';
import { request } from "../utils/helper";

export default {
  'getItem': createAction('GET_ITEM', reqData => request('/item/get', reqData, 'post'), reqData => reqData),
  // 点赞
  'itemLike': createAction('ITEM_LIKE', reqData => request('/item/like', reqData, 'post'), reqData => reqData),
  // 取消点赞
  'itemCanclelike': createAction('ITEM_CANCLE_LIKE', reqData => request('/item/canclelike', reqData, 'post'), reqData => reqData),
  // 发布评论
  'itemComment': createAction('ITEM_COMMENT', reqData => request('/item/comment', reqData, 'post'), reqData => reqData),
  // 添加好友信息
  'addFriendMessage': createAction('ADD_FREIND_MESSAGE', reqData => request('/user/addfriendmessage', reqData, 'post'), reqData => reqData),
  // 获取与我相关的信息
  'aboutMe': createAction('ABOUT_ME', reqData => request('/item/aboutme', reqData, 'post'), reqData => reqData),
  // 获取我的发布
  'myRelease': createAction('ABOUT_ME', reqData => request('/item/myrelease', reqData, 'post'), reqData => reqData),
  // 获取用户信息
  'userDetail': createAction('USER_DETAIL', reqData => request('/user/detail', reqData, 'get'), reqData => reqData),
  //删除数据
  'delete': createAction('DELETE', reqData => request('/item/delete', reqData, 'post'), reqData => reqData),
};