import { Modal, Form, Input, Button, Checkbox, message } from 'antd';
import React, { useEffect, FC } from 'react';
import { SingleUserType, FormValues } from '../data.d';

interface UserModalProps {
  visible: boolean;
  record: SingleUserType | undefined;
  closeHandler: () => void; //是一个无参数的函数，没有返回值
  onFinish: (values: FormValues) => void;
}

const UserModal: FC<UserModalProps> = props => {
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

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error(errorInfo.errorFields[0].errors[0]);
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
