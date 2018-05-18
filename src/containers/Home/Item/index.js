import React from 'react';
import { Avatar, Popover, Modal, Input, Button, message } from 'antd';
import { NavLink } from 'react-router-dom'

import { connect, timeFormat } from 'utils/helper';
import homeActions from 'actions/home';

import Svg from 'components/Svg';

import STYLE from './style.less';

class Home extends React.Component {

  state = {
    previewVisible: false,
    previewImgUrl: '',
    commentContent: '',
    showComment: false
  }

  preview = img => {
    this.setState({ previewImgUrl: img, previewVisible: true });
  }

  handleCancel = () => {
    this.setState({ previewVisible: false });
  }

  onLike = () => {
    const { item, data, actions } = this.props;
    const { time } = item;
    const { user } = data;
    const likeTime = Date.now();
    delete user.contact;
    delete user.message;
    const messageContent = {
      type: 'like',
      time: likeTime,
      hasRead: false,
      messageAuthor: user,
      messageTo: item.author,
      itemTime: time
    };

    actions.itemLike({ ...user, time, likeTime, messageContent });
  }

  onCancleLike = () => {
    const { item, data, actions } = this.props;
    const { time } = item;
    const { accountNumber } = data.user;
    actions.itemCanclelike({ accountNumber, time });

  }

    inputOnChange = e => {
    this.setState({
      commentContent: e.target.value
    });
  }

  onShowComment = () => {
    this.setState({ showComment: !this.state.showComment });
  }

  onComment = () => {
    const { commentContent } = this.state;
    if (!commentContent) return message.error('评论不能为空');
    else {
      const commentTime = Date.now();
      const { item, data, actions } = this.props;
      const { time } = item;
      const { user } = data;
      delete user.contact;
      delete user.message;
      const messageContent = {
        type: 'comment',
        time: commentTime,
        comment: commentContent,
        hasRead: false,
        messageAuthor: user,
        messageTo: item.author,
        itemTime: time
      };
      actions.itemComment({ ...user, time, commentTime, commentContent, messageContent });
      this.setState({ showComment: false});
    }
  }

  addFriendMessage = async () => {
    const { item, data: { user }, actions } = this.props;
    delete user.contact;
    delete user.message;
    const addFriendTime = Date.now();
    const messageContent = {
      type: 'addFriend',
      time: addFriendTime,
      hasRead: false,
      messageAuthor: user,
      messageTo: item.author,
      agree: null
    };
    await actions.addFriendMessage(messageContent);
    message.success('请求已发出');
  }

  render() {
    const { previewVisible, previewImgUrl, commentContent, showComment } = this.state;
    const { author, content, time, imgUrl, like, comment } = this.props.item;
    const { accountNumber, friend } = this.props.data.user;
    const isLike = !!like.find(i => i === i && i.accountNumber === accountNumber);
    const popoverContent = (data, size = 'default') => (
      <div className={STYLE.popover}>
        <div className={STYLE['popover-header']}>
          <div className={STYLE['popover-img']}>
            <Avatar size={size} src={data.avatar}/>
          </div>
          <span>
            <NavLink to={`/detail/${data.accountNumber}`}>
              {data.name}
            </NavLink>
          </span>
        </div>
        <p className={STYLE.school}>
          <span>学校:</span>
          <span>{data.school}</span>
        </p>
        <p className={STYLE.motto}>
          <span>座右铭:</span>
          <span>{data.motto}</span>
        </p>
        {
          data.accountNumber !== accountNumber && !friend.find(i => i.accountNumber === data.accountNumber) ? <div className={STYLE['add-friend']}>
            <Button type="primary" onClick={this.addFriendMessage}>加好友</Button>
          </div> : (friend.find(i => i.accountNumber === data.accountNumber) ? <p className={STYLE['is-friend']}>你们已经是好友了</p> : null)
        }
      </div>
    );

    return (
      <div className={STYLE['item-content']}>
        <div className={STYLE.author}>
          <Popover content={popoverContent(author)} placement="bottomLeft">
           <Avatar src={author.avatar}/>
          </Popover>
          <p>{timeFormat(time)}</p>
        </div>
        <div className={STYLE.content}>
          <p>{content}</p>
          {
            imgUrl.length ? (
              <div className={STYLE['img-content']}>
                {imgUrl.map(i => <div onClick={() => this.preview(i)} key={i}><img src={i}/></div>)}
              </div>
            ) : null
          }
          <div className={STYLE.like}>
            {
            isLike ? (
              <span onClick={this.onCancleLike}>
                  <Svg type="icon-tubiaozhizuomobanyihuifu-19" />
                </span>
            ) : (
              <span onClick={this.onLike}>
                  <Svg type={"icon-tubiaozhizuomobanyihuifu-3"} />
                </span>
            )
          }
            <span onClick={this.onShowComment}>
              <Svg type="icon-tubiaozhizuomobanyihuifu-4" />
            </span>
          </div>
          {
            like.length ? (
              <div className={STYLE['like-people']}>
                {like.map((i, index) => <span key={index}>{
                  <Popover content={popoverContent(i, 'small')} placement="bottomLeft">
                    <Avatar src={i.avatar}/>
                  </Popover>
                }</span>)}
              </div>
            ) : null
          }
          {
            comment.length ? (
              <div className={STYLE['comment-people']}>
                {
                  comment.map((i, index) => <div key={index}>
                    <div className={STYLE['comment-img']}>
                      {
                        <Popover content={popoverContent(i, 'small')} placement="bottomLeft">
                          <Avatar src={i.avatar}/>
                        </Popover>
                      }
                      <p>{timeFormat(i.commentTime)}</p>
                    </div>
                    <p className={STYLE['comment-content']}>
                      <span>{i.name}:  </span>
                      <span>{i.commentContent}</span>
                    </p>
                  </div>)
                }
              </div>
            ) : null
          }
          <div className={STYLE.comment} style={{height: showComment ? 'auto' : '0', borderTop: showComment ? '1px solid #eee':'none'}}>
            <div className={STYLE.input}>
              <Input.TextArea onChange={this.inputOnChange} value={commentContent} placeholder="说点什么吧..." autosize={{minRows: 3, maxRows: 4}}/>
            </div>
            <div className={STYLE.button}>
              <Button onClick={this.onComment} type="primary">提交</Button>
            </div>
          </div>
        </div>
        <Modal className={STYLE.modal} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          {
            previewImgUrl && <img alt="example" style={{ width: "720px" }} src={previewImgUrl} />
          }
        </Modal>
      </div>
    )
  }
}
export default connect(state => ({...state.home, user: { ...state.user }}), homeActions)(Home);