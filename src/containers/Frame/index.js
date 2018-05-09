import React from 'react';

import { connect } from 'utils/helper';
import homeActions from 'actions/home';

class Frame extends React.Component {

  render() {
    return (
      <div>1111</div>
    )
  }
}
export default connect(state => state.home, homeActions)(Frame);