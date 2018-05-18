import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/zh-cn';
import { message } from 'antd';

import Header from './Header';

import 'layouts/less/common.less';

moment.locale('zh-cn');

message.config({
  top: 60,
  duration: 2,
  maxCount: 3
});

class Frame extends React.Component {

  componentDidMount () {
    const user = localStorage.getItem('wangyan');
    !user && this.props.history.push('/sign');
  }

  render() {
    return (
      <Header />
    )
  }
}
export default withRouter(Frame);