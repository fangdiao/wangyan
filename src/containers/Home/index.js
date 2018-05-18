import React from 'react';
import classnames from 'classnames';

import { connect } from 'utils/helper';
import homeActions from 'actions/home';
import Curd from './Curd';
import Item from './Item';

import Svg from 'components/Svg';

import STYLE from './style.less';

class Home extends React.Component {

  state = {
    windowWidth: 0,
    index: 0,
    hasMore: true
  }

  componentDidMount () {
    const { index } = this.state;
    this.props.actions.getItem({ index });
    const getWidth = () => {
      this.setState({
        windowWidth: window.innerWidth
      });
    }
    getWidth();
    window.onresize = getWidth;

    window.onscroll = () => {
      if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()){
        const index =  ++this.state.index;
        this.setState({ index }, async () => {
          if (this.state.hasMore) {
            const res = await this.props.actions.getItem({ index });
            if (res.payload.data.length < 5) {
              this.setState({ hasMore: false });
            }
          }
        });
      }
    };
  }

  getScrollTop = () => {
    let scrollTop = 0;
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if(document.body){
      bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }

  getScrollHeight = () => {
    let scrollHeight = 0;
    let bodyScrollHeight = 0;
    let documentScrollHeight = 0;
    let bSH = document.body.scrollHeight;
    let dSH = document.documentElement.scrollHeight;
    scrollHeight = (bSH - dSH > 0) ? bSH : dSH ;
    return scrollHeight;
  }

  getWindowHeight = () => {
    let windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  render() {
    let { windowWidth } = this.state;
    let left = 0;
    if (windowWidth <= 1000) {
      left = 670;
    } else {
      left = (windowWidth - 840) / 2 + 590;
    }
    const { itemData } = this.props.data;
    return (

      <div className={classnames(STYLE['home'], {['container margin-top-large']:true})}>
        <div className="content">
          <div className={STYLE['home-content']}>
            <div className={STYLE.items}>
              {
                itemData.length ? itemData.map((i, index) => <div key={index}><Item item={i} /></div>) : null
              }
            </div>
            <div style={{left: `${left}px`}} className={STYLE.curd}>
              <Curd />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({ ...state.home, ...state.user }), homeActions)(Home);