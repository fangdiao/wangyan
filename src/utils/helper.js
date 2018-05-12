
import { connect as rrConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from 'query-string';

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

export const request = (url, body = '', method = 'get') => {
  if (body && method === 'get') {
    url = `${url}?${qs.stringify(body)}`;
  } else if (body && method === 'post') {
    body = JSON.stringify(body);
  }
  let headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  };

  let params = body && method === 'post' ? {
    method,
    headers,
    body
  } : {
    method,
    headers
  };
  return new Promise((resolve, reject) => {
    fetch(url, params).then(r => r.json())
      .then(responseData => {
        resolve(responseData);
      }).catch(err => {
      console.log(err);
      reject(err);
    });
  });
}
