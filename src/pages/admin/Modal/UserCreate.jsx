import {
  Button,
  Modal,
  Form,
  Input,
  Divider,
  message,
  notification,
} from "antd";
import { createUser } from "../../../services/userApi";
import { useState } from "react";

const UserCreate = (props) => {
  const { isModalOpen, setIsModalOpen } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (vaules) => {
    const { fullName, password, email, phone } = vaules;
    setIsSubmit(true);

    const res = await createUser(fullName, password, email, phone);
    if (res && res.data) {
      message.success("Tạo mới thành công");
      form.resetFields();
      setIsModalOpen(false);
      await props.fetchListUser();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={<h2>Thêm mới người dùng</h2>}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        centered={true}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
      >
        <Divider />
        <Form
          form={form}
          onFinish={handleSubmit}
          name="layout-multiple-vertical"
          layout="vertical"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item
            layout="vertical"
            label="Tên hiển thị"
            name="fullName"
            rules={[{ required: true, message: "Please input your Name!" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserCreate;
