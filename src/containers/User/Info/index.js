import React from 'react';
import { Form, Input, Button, Upload, Icon, DatePicker, message, Radio } from 'antd';
import moment from 'moment';

import { connect } from 'utils/helper';
import userActions from 'actions/user';

import STYLE from './style.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const beforeUpload = file => {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片最大为2M');
  }
  return isLt2M;
}

class Info extends React.Component {

  state = {
    loading: false,
    baseUrl: '',
    avatar: ''
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, baseUrl => this.setState({
        baseUrl,
        loading: false,
        avatar: info.file.response.avatar
      }));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { getFieldsValue, validateFields } = this.props.form;
    const { avatar } = this.state;
    const oldAvatar = this.props.data.avatar;
    validateFields(async err => {
      if (!err && (avatar || oldAvatar)) {
        const user = this.props.data;
        let data = getFieldsValue();
        let birthday = moment(data.birthday).valueOf();
        const postData = { ...user, ...data, birthday, avatar: avatar || oldAvatar };
        const res = await this.props.actions.info(postData);
        res.payload.success && message.success('保存成功');
      }
    });
  }

  disabledDate = current => {
    return current && current > moment([2000, 8, 8]).endOf('day');
  }

  render() {
    const { baseUrl } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { avatar, name, birthday, motto, qq, school, weixin, sex } = this.props.data;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 }
      },
      wrapperCol: {
        sm: { span: 20 }
      },
    };

    const uploadButton = (
      <div>
        <Icon style={{fontSize: "24px"}} type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className={STYLE.info}>
        <div className={STYLE.image}>
          <Upload
            name="file"
            accept="image/*"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/upload"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            headers={{enctype: "multipart/form-data"}}
          >
            {baseUrl || avatar ? <img src={baseUrl || avatar} alt="" /> : uploadButton}
          </Upload>
        </div>
        <div className={STYLE.content}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="昵称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, type: 'string', message: '请正确填写昵称', min: 1, max: 20
                }],
                initialValue: name || ''
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {getFieldDecorator('sex', {
                rules: [{
                  required: true
                }],
                initialValue: sex || '男'
              })(
                <RadioGroup name="radiogroup">
                  <Radio value={'男'}>男</Radio>
                  <Radio value={'女'}>女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="学校"
            >
              {getFieldDecorator('school', {
                rules: [{
                  required: true, message: '请正确填写学校', min: 1, max: 10
                }],
                initialValue: school || ''
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="生日"
            >
              {getFieldDecorator('birthday', {
                rules: [{ type: 'object', required: true, message: '请选择生日' }],
                initialValue: birthday ? moment(birthday) : moment([2000, 8, 8])
              },)(
                <DatePicker disabledDate={this.disabledDate}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="qq"
            >
              {getFieldDecorator('qq', {
                rules: [{
                  required: true, type: 'string', message: '请正确填写qq号码', min: 6, max: 30
                }],
                initialValue: qq || ''
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="微信"
            >
              {getFieldDecorator('weixin', {
                rules: [{
                  required: true, type: 'string', message: '请正确填写微信号', min: 6, max: 20
                }],
                initialValue: weixin || ''
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="座右铭"
            >
              {getFieldDecorator('motto', {
                rules: [{
                  required: true, type: 'string', message: '请正确填写座右铭', min: 6, max: 200
                }],
                initialValue: motto || ''
              })(
                <Input.TextArea autosize={{minRows: 4, maxRows: 6}}/>
              )}
            </FormItem>
              <FormItem>
                <div className={STYLE.button}>
                  <Button type="primary" htmlType="submit">保存</Button>
                </div>
              </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedInfo = Form.create()(Info);

export default connect(state => state.user, userActions)(WrappedInfo);