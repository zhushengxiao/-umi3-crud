import { Modal, Form, Input, Button, Checkbox } from 'antd';
import React, { useEffect } from 'react';

const UserModal = props => {
  const [form] = Form.useForm();
  const { visible, record, closeHandler, onFinish } = props;
  // 接收2个参数, 第一个是函数m,第二个是值(当它改变后触发)

  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(record);
    }
  }, [visible]);

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Modal
        visible={visible}
        title={'Basic Modal'}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Create Time" name="create_time">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
