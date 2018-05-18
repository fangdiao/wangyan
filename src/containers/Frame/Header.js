import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom'

import { connect } from 'utils/helper';
import userActions from 'actions/user';

import Out from './Out';
import Svg from 'components/Svg';

import STYLE from './style.less';

class Header extends React.Component {

  componentDidMount () {
    this.props.actions.signINLocal();
  }

  render() {

    return (
      <header className="container">
        <div className={classnames(STYLE['header-content'], {['content']:true})}>
          <NavLink to="/">
            <div className={STYLE['home-logo']}>
              <span className={STYLE['home-icon']}>
                <Svg type="icon-shouye"></Svg>
              </span>
              <span className={STYLE.line}></span>
              <span className={STYLE.name}>社交网站</span>
            </div>
          </NavLink>
          <Out />
        </div>
      </header>
    )
  }
}
export default connect(state => state.user, userActions)(Header);