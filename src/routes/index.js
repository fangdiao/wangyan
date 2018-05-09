import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Frame from '../containers/Frame';

export default class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route path='/' component={Frame} />
      </Switch>
    );
  }
};
