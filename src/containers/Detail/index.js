import React from 'react';
import { Button } from 'antd';

import { connect } from 'utils/helper';
import userActions from 'actions/user';
import homeActions from 'actions/home';
import Item from 'containers/Home/Item';

import STYLE from './style.less';
import classnames from "classnames";
import {message} from "antd/lib/index";

class Detail extends React.Component {

  state = {
    userData: {}
  }

  async componentDidMount () {
    const { accountNumber } = this.props.match.params;
    const res = await this.props.actions.userDetail({accountNumber});
    const { data } = res.payload;
    this.setState({ userData: { ...data } });
  }

  addFriendMessage = async () => {
    const { userData } = this.state;
    const { data, actions } = this.props;
    delete data.contact;
    delete data.message;
    delete data.itemData;
    delete userData.itemData;
    const addFriendTime = Date.now();
    const messageContent = {
      type: 'addFriend',
      time: addFriendTime,
      hasRead: false,
      messageAuthor: data,
      messageTo: userData,
      agree: null
    };
    await actions.addFriendMessage(messageContent);
    message.success('请求已发出');
  }

  render() {
    const { name, avatar, motto, school, sex, friend, accountNumber } = this.state.userData;
    const myAccountNumber = this.props.data.accountNumber;
    const { itemData } = this.props.data;
    return (
      <div className={classnames(STYLE.wrapper, {['container margin-top-large']:true})}>
        <div className="content">
          {
            name ? (
              <div className={STYLE.detail}>
                <div className={STYLE.info}>
                  <div className={STYLE.img}>
                    <img src={avatar} alt=""/>
                  </div>
                  <p>
                    <span>昵称:</span>
                    <span className={STYLE.name}>{name}</span>
                  </p>
                  <p>
                    <span>性别:</span>
                    <span>{sex}</span>
                  </p>
                  <p>
                    <span>学校:</span>
                    <span>{school}</span>
                  </p>
                  <p>
                    <span>座右铭:</span>
                    <span>{motto}</span>
                  </p>
                  {
                    myAccountNumber !== accountNumber && !friend.find(i => i.accountNumber === accountNumber) ? <div className={STYLE['add-friend']}>
                      <Button type="primary" onClick={this.addFriendMessage}>加好友</Button>
                    </div> : (friend.find(i => i.accountNumber === myAccountNumber) ? <p className={STYLE['is-friend']}>你们已经是好友了</p> : null)
                  }
                </div>
                <div className={STYLE.release}>
                  {
                    itemData.length ? itemData.map((i, index) => <div key={index} className={STYLE.item}><Item item={i}/></div>) : <p>什么也没有</p>
                  }
                </div>
              </div>
            ) : null
          }
        </div>
      </div>
    )
  }
}
export default connect(state => ({...state.user, ...state.home}), ({...homeActions, ...userActions}))(Detail);