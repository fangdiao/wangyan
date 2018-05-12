import React from 'react';

import { connect } from 'utils/helper';
import userActions from 'actions/user';

class Frame extends React.Component {

  async componentDidMount () {
    const { siginIn } = this.props.actions;
    const data = await siginIn({ name: '01' });
    console.log(this.props);
  }

  render() {
    return (
      <div>1111</div>
    )
  }
}
export default connect(state => state.user, userActions)(Frame);