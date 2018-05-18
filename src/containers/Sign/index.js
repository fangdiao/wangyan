import React from 'react';
import { Tabs } from 'antd';

import { connect } from 'utils/helper';
import userActions from 'actions/user';
import SignIn from './SignIn';
import SignUp from './SignUp';

import STYLE from './style.less';

const TabPane = Tabs.TabPane;
class Sign extends React.Component {

  state = {
    activeKey: 'signIn'
  }

  onChangeTab = activeKey => {
    this.setState({ activeKey });
  };

  componentDidMount () {
    const user = localStorage.getItem('wangyan');
    user && this.props.history.push('/');
  }

  render() {

    const { activeKey } = this.state;
    return (
      <div className={STYLE.sign}>
        <div className={STYLE['sign-content']}>
          <Tabs activeKey={activeKey} onChange={this.onChangeTab} tabBarGutter={60}>
            <TabPane tab="登录" key="signIn">
              <SignIn/>
            </TabPane>
            <TabPane tab="注册" key="signUp">
              <SignUp onChangeTab={this.onChangeTab}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}


export default connect(state => state.user, userActions)(Sign);