import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Frame from 'containers/Frame';
import Sign from 'containers/Sign';
import Home from 'containers/Home';
import User from 'containers/User';
import Detail from 'containers/Detail';

export default class App extends React.Component {

  render () {
    return (
      <div>
        <Frame />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/sign" exact component={Sign} />
          <Route path="/user/:activeKey" exact component={User} />
          <Route path="/detail/:accountNumber" exact component={Detail} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
};
