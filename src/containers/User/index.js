import React from 'react';
import 'moment/locale/zh-cn';
import { message, Tabs } from 'antd';

import { connect } from 'utils/helper';
import homeActions from 'actions/home';
import userActions from 'actions/user';
import Svg from 'components/Svg';
import MyRelease from './MyRelease';
import Message from './Message';
import Friend from './Friend';
import Info from './Info';
import Release from './Release';
import AboutMe from './AboutMe';

import STYLE from './style.less';

const TabPane = Tabs.TabPane;

message.config({
  top: 60,
  duration: 2,
  maxCount: 3
});

/*
* @params activeKey info release friend message
* */

class Frame extends React.Component {

  state = {
    activeKey: 'info'
  }

  onChangeTab = e => {
    const { actions, data: { accountNumber }  } =  this.props;
    if (e === 'contact') {
      actions.aboutMe({accountNumber});
    }
    if (e === 'myRelease') {
      actions.myRelease({accountNumber});
    }
    if (e === 'message') {
      actions.getMessage({accountNumber});
    }
    this.setState({ activeKey: e });
  }

  componentDidMount () {
    const { activeKey } = this.props.match.params;
    activeKey && this.setState({ activeKey });
  }

  render() {
    const { activeKey } = this.state;
    return (
      <div className="container">
        <div className="content margin-top-large">
          <div className={STYLE.user}>
            <div className={STYLE['user-content']}>
              <Tabs activeKey={activeKey} onChange={this.onChangeTab} tabPosition="left">
                <TabPane tab={<span className={STYLE.tabIcon}><Svg type="icon-wode"/>我的信息</span>} key="info">
                  <div className={STYLE['children']}>
                    <Info />
                  </div>
                </TabPane>
                <TabPane tab={<span className={STYLE.tabIcon}><Svg type="icon-bianji"/>发布动态</span>} key="release">
                  <div className={STYLE['children']}>
                    <Release/>
                  </div>
                </TabPane>
                <TabPane tab={<span className={STYLE.tabIcon}><Svg type="icon-fenxiang"/>我的动态</span>} key="myRelease">
                  <div className={STYLE['children']}>
                    <MyRelease />
                  </div>
                </TabPane>
                <TabPane tab={<span className={STYLE.tabIcon}><Svg type="icon-xinxi"/>我的消息</span>} key="message">
                  <div className={STYLE['children']}>
                    <Message/>
                  </div>
                </TabPane>
                <TabPane tab={<span className={STYLE.tabIcon}><Svg type="icon-xinxi"/>与我相关</span>} key="contact">
                  <AboutMe/>
                </TabPane>
              </Tabs>
            </div>
            <div className={STYLE.friend}>
              <Friend/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => state.user, ({...homeActions, ...userActions}))(Frame);