import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom'

import { connect } from 'utils/helper';
import homeActions from 'actions/home';

import Svg from 'components/Svg';

import STYLE from './style.less';

class Home extends React.Component {



  render() {

    const CURD_DATA = [
      { name: '我的信息', key: 'info', icon: 'icon-tubiaozhizuomobanyihuifu-16' },
      { name: '发布动态', key: 'release', icon: 'icon-tubiaozhizuomobanyihuifu-9' },
      { name: '我的动态', key: 'myRelease', icon: 'icon-tubiaozhizuomobanyihuifu-8' },
      { name: '我的消息', key: 'message', icon: 'icon-tubiaozhizuomobanyihuifu-3' },
      { name: '我的好友', key: 'info', icon: 'icon-tubiaozhizuomobanyihuifu-' },
      { name: '与我相关', key: 'contact', icon: 'icon-tubiaozhizuomobanyihuifu-14' },
    ];

    return (
      <div className={STYLE['item-content']}>
        {
          CURD_DATA.map((i, index) => (
            <div className={STYLE['curd-item']} key={index}>
              <NavLink to={`user/${i.key}`}>
                <span className={STYLE['curd-icon']}>
                  <Svg type={i.icon}></Svg>
                </span>
                <span className={STYLE.text}>{i.name}</span>
              </NavLink>
            </div>
          ))
        }
      </div>
    )
  }
}
export default connect(state => state.home, homeActions)(Home);