
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
  url = `/api${url}`
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

export const timeFormat = timestamps => {
  const [ sec, min, hour, day ] = [ 1, 60, 3600, 86400 ];
  const now = Date.now();
  const lag = parseInt((now - Number(timestamps)) / 1000);
  let [ unit, type ] = [ '天', 0 ];
  switch (true) {
    case (lag < min):
      type = sec;
      unit = '秒';
      break;
    case (lag < hour):
      type = min;
      unit = '分钟';
      break;
    case (lag < day):
      type = hour;
      unit = '小时';
      break;
    default:
      type = day;
  };
  const value = parseInt(lag / type);
  return `${value}${unit}前`;
};
