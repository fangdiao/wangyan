import React from 'react';
import '../layouts/svg/iconfont';


export default class Svg extends React.Component {

  render() {
    const { type } = this.props;
    const href = `#${type}`;
    const useTag = `<use xlink:href=${href} />`;
    return (
      <svg style={{width: "100%", height: "100%"}} className="icon" dangerouslySetInnerHTML={{__html: useTag }} />
    )
  }
};
