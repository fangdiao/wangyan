
import { connect as rrConnect } from 'react-redux';
import { bindActionCreators } from 'redux';

export const connect = (dataMaker = () => {}, actions = () => {}) => Component => {
  const mapStateToProps = state => ({
    data: dataMaker(state)
  });
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  });

  Component = rrConnect(mapStateToProps, mapDispatchToProps)(Component);
  return Component;
};