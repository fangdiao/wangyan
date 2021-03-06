import React from 'react';
import { Form, Input, Button, Icon, message } from 'antd';

import { connect } from 'utils/helper';
import userActions from 'actions/user';

import STYLE from './style.less';

const FormItem = Form.Item;

class Sign extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const { getFieldsValue, validateFields } = this.props.form;
    validateFields(async err => {
      if (!err) {
        const data = getFieldsValue();
        const res = await this.props.actions.siginUp(data);
        if (res.payload.success) {
          message.success("注册成功");
          this.props.onChangeTab('signIn');
        } else {
          message.destroy();
          message.error("账号已注册");
        }
      }
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('accountNumber', {
            rules: [{ min: 8, max: 20, required: true, message: '请正确填写用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ min: 8, max: 20, required: true, message: '请正确填写密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={STYLE['login-form-button']}>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Sign);

export default connect(state => state.user, userActions)(WrappedNormalLoginForm);