import {
  Button,
  Modal,
  Form,
  Input,
  Divider,
  message,
  notification,
} from "antd";
import { updateUser } from "../../../services/userApi";
import { useEffect, useState } from "react";

const UserUpdate = (props) => {
  const { isModalOpen, setIsModalOpen, dataUpdate, setDataUpdate } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  const handleSubmit = async (vaules) => {
    const { _id, fullName, phone } = vaules;
    setIsSubmit(true);

    const res = await updateUser(_id, fullName, phone);
    if (res && res.data) {
      message.success("Cập nhật thành công");
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
    setDataUpdate(null);
  };

  return (
    <>
      <Modal
        title={<h2>Cập nhật người dùng</h2>}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        centered={true}
        okText={"Cập nhật"}
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
            hidden
            layout="vertical"
            label="id"
            name="_id"
            rules={[{ required: true, message: "Please input your id!" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Email"
            name="email"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input disabled />
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

export default UserUpdate;
