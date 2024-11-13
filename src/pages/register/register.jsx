import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
  notification,
} from "antd";
import "./register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { postRegister } from "../../services/authApi";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    setIsSubmit(true);
    const res = await postRegister(fullName, email, password, phone);
    setIsSubmit(false);
    if (res?.data?._id) {
      message.success("Đăng ký thành công");
      navigate("/login");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 3,
      });
    }
  };

  return (
    <div className="register-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h1 style={{ textAlign: "center" }}>Đăng Ký Tài Khoản</h1>
              <Divider />
            </div>
            <Form
              name="basic"
              // labelCol={{ span: 6 }}
              // wrapperCol={{ span: 14 }}
              // style={{ maxWidth: 600, margin: "0 auto" }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }}
                label="Họ tên"
                name="fullName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
              //  wrapperCol={{ offset: 10, span: 14 }}
              >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
            <h4 style={{ textAlign: "center", margin: "15px 0px" }}>Or</h4>
            <div>
              Đã có Tài Khoản ? <NavLink to={"/login"}>Đăng nhập</NavLink>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Register;
