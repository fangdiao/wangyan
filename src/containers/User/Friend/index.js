import React from 'react';
import { Popover, Avatar, Popconfirm, Button, message } from 'antd';
import { NavLink } from 'react-router-dom'

import { connect } from 'utils/helper';
import userActions from 'actions/user';

import STYLE from './style.less';

class Friend extends React.Component {

  deleteFriend = async friend => {
    const { actions, data } = this.props;
    await actions.deleteFriend({ friend, user: data });
    message.success(`成功删除好友${friend.name}`);
  }

  render() {
    const { friend } = this.props.data;

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
        <Popconfirm title={`确定删除${data.name}好友吗?`} onConfirm={() => this.deleteFriend(data)} okText="确定" cancelText="取消">
          <Button type="danger">删除好友</Button>
        </Popconfirm>
      </div>
    );

    return (
      <div className={STYLE.friend}>
        {
          friend && friend.length ? friend.map(i => (
            <span className={STYLE.item} key={i.accountNumber}>
              <Popover content={popoverContent(i)} placement="bottomLeft">
                <Avatar shape="square" size="large" src={i.avatar}/>
              </Popover>
            </span>
          )): <p>无好友</p>
        }
      </div>
    )
  }
}


export default connect(state => state.user, userActions)(Friend);