import React from 'react';

import { connect } from 'utils/helper';
import homeActions from 'actions/home';
import Item from 'containers/Home/Item';

import STYLE from './style.less';

class AboutMe extends React.Component {

  componentDidMount () {
    const { actions, data  } =  this.props;
    const { accountNumber } = data.user;
    actions.myRelease({accountNumber});
  }

  render() {
    const { itemData } = this.props.data;
    return (
      <div className={STYLE['about-me']}>{
        itemData && itemData.length ? (
          itemData.map((i, index) => <div className={STYLE.item} key={index}><Item item={i}/></div>)
        ) : <p>暂无数据</p>
      }</div>
    )
  }
}


export default connect(state => ({ user: {  ...state.user }, ...state.home }), homeActions)(AboutMe);