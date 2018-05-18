import React from 'react';
import { Button, Popconfirm, message as messageAntd } from 'antd';

import { connect } from 'utils/helper';
import userActions from 'actions/user';

import STYLE from './style.less';

class Sign extends React.Component {

  componentDidMount () {
    const { actions, data: { accountNumber } } =  this.props;
    actions.getMessage({accountNumber});
  }

  agreeAddFriend = async data => {
    const { time, messageAuthor, messageTo } = data;
    const user = messageTo;
    const friend = messageAuthor;
    const agree = true;
    const agreeAddFriendTime = Date.now();
    const messageContent = {
      type: 'agreeAddFriend',
      time: agreeAddFriendTime,
      hasRead: false,
      messageAuthor: user,
      messageTo: messageAuthor,
      agree
    };
    await this.props.actions.addFriend({ agree, friend, user, time, messageContent });
    messageAntd.success('添加好友成功')
  }

  disagreeAddFriend = async data => {
    const { time, messageAuthor, messageTo } = data;
    const user = messageTo;
    const friend = messageAuthor;
    const agree = false;
    const agreeAddFriendTime = Date.now();
    const messageContent = {
      type: 'agreeAddFriend',
      time: agreeAddFriendTime,
      hasRead: false,
      messageAuthor: user,
      messageTo: messageAuthor,
      agree
    };
    await this.props.actions.addFriend({ agree, friend, user, time, messageContent });
    messageAntd.success('拒绝添加好友成功')
  }

  render() {

    const { message } = this.props.data;

    const Like = data => (
      <p className={STYLE.comment}>
        <span>
          <span>{data.messageAuthor.name}</span>
          <span>喜欢你的动态</span>
        </span>
        <span>点击查看详情</span>
      </p>
    );
    const Comment = data => (
      <p className={STYLE.comment}>
        <span>
          <span>{data.messageAuthor.name}</span>
          <span>评论了你的动态</span>
        </span>
        <span>点击查看详情</span>
      </p>
    );

    const AddFriendResult = data => (
      <p className={STYLE.friend}>
        <span>{data.messageAuthor.name}</span>
        <span>{data.agree ? '同意了你的好友请求' : '拒绝了你的好友请求'}</span>
      </p>
    );

    const AddFriend = data => (
      <div>
        <span>
          <span>{data.messageAuthor.name}</span>
          <span>请求添加你为好友</span>
        </span>
        {
          data.agree !== true && data.agree !== false ? (
            <span>
              <Popconfirm title={`确定添加${data.messageAuthor.name}为好友吗?`} onConfirm={() => this.agreeAddFriend(data)} okText="确定" cancelText="取消">
                <Button type="primary">同意</Button>
              </Popconfirm>
               <Popconfirm title={`确定拒绝${data.messageAuthor.name}的好友请求吗?`} onConfirm={() => this.disagreeAddFriend(data)} okText="确定" cancelText="取消">
                <Button type="danger">拒绝</Button>
              </Popconfirm>
            </span>
          ) : <span className={STYLE.agree}>{data.agree === true ? '已接受' : '已拒绝'}</span>
        }
      </div>
    );

    return (
      <div className={STYLE.message}>
        {
          message.length ? message.map(i => {
            let com = null;
            if (i.type === 'like') {
              com = <div className={STYLE.curd} key={i.time}>{Like(i)}</div>;
            } else if (i.type === 'comment') {
              com = <div className={STYLE.curd} key={i.time}>{Comment(i)}</div>;
            } else if (i.type === 'addFriend') {
              com = <div className={STYLE.curd} key={i.time}>{AddFriend(i)}</div>
            } else {
              com = <div className={STYLE.curd} key={i.time}>{AddFriendResult(i)}</div>
            }
            return com;
          }) : <p>暂无消息</p>
        }
      </div>
    )
  }
}


export default connect(state => state.user, userActions)(Sign);