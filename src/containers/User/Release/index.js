import React from 'react';
import { withRouter } from 'react-router-dom'
import { Input, Upload, Icon, Button, message, Modal } from 'antd';

import { connect } from 'utils/helper';
import userActions from 'actions/user';

import STYLE from './style.less';

class Release extends React.Component {

  state = {
    content: '',
    imgUrl: [],
    previewVisible: false,
    previewImage: '',
    fileList: [],
    loading: false
  };

  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片最大为2M');
    }
    return isLt2M;
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      let { imgUrl } = this.state;
      imgUrl = [ ...imgUrl, info.file.response.avatar ];
      this.setState({ imgUrl, fileList: info.fileList, loading: false });
    }
  }

  onRemove = file => {
    let { imgUrl } = this.state;
    const item = file.response.avatar;
    this.setState({ imgUrl: imgUrl.filter(i => i !== item) });
  }

  inputOnChange = e => {
    this.setState({
      content: e.target.value
    });
  }

  release = async () => {
    const { content, imgUrl } = this.state;
    if (!content && !imgUrl.length) {
      message.error('内容不能为空');
      return;
    } else {
      const { data, actions, history } = this.props;
      const { accountNumber, avatar, name, school, motto } = data;
      const author = { accountNumber, avatar, name, school, motto };
      const time = Date.now();
      const res = await actions.release({ content, imgUrl, time, author });
      if (res.payload.success) {
        message.success('发布成功');
       history.push('/');
      } else {
        message.error('发布失败');
      }
    }
  }

  render() {

    const { fileList, loading, previewVisible, previewImage, content } = this.state;
    const uploadButton = (
      <div>
        <Icon style={{fontSize: "24px"}} type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className={STYLE.release}>
        <Input.TextArea onChange={this.inputOnChange} value={content} placeholder="说点什么吧..." autosize={{minRows: 4, maxRows: 6}}/>
        <div className={STYLE.image}>
          <Upload
            name="file"
            accept="image/*"
            action="/api/upload"
            listType="picture-card"
            onChange={this.handleChange}
            showUploadList={{ showRemoveIcon: true }}
            beforeUpload={this.beforeUpload}
            onPreview={this.handlePreview}
            headers={{enctype: "multipart/form-data"}}
            onRemove={this.onRemove}
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload>
        </div>
        <div className={STYLE.button}>
          <Button type="primary" onClick={this.release}>发布</Button>
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}


export default connect(state => state.user, userActions)(withRouter(Release));