import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { NavLink, withRouter } from 'react-router-dom'

import { connect } from 'utils/helper';
import userActions from 'actions/user';
import Svg from 'components/Svg';

import STYLE from './style.less';

class Out extends React.Component {

  onClick = ({ key }) => {
    if (key === 'out') {
      this.props.actions.signOut();
      this.props.history.push('/sign');
    }
  }

  render() {
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="user">
          <NavLink to="/user/info">
            <span className={STYLE['out-icon']}>
              <Svg type="icon-tubiaozhizuomobanyihuifu-"></Svg>
            </span>
            我的主页
          </NavLink>
        </Menu.Item>
        <Menu.Item key="out">
          <span className={STYLE['out-icon']}>
            <Svg type="icon-tubiaozhizuomobanyihuifu-5"></Svg>
          </span>
          退出
        </Menu.Item>
      </Menu>
    );

    const { avatar, accountNumber } = this.props.data;
    return (
      <div>
        {
          accountNumber ? (
            <div className={STYLE.out} ref="out">
              <Dropdown placement="bottomCenter" overlay={menu} trigger={['click']}>
                <Avatar icon="user" src={avatar}/>
              </Dropdown>
            </div>
          ) : null
        }
      </div>
    );
  }
}
export default connect(state => state.user, userActions)(withRouter(Out));