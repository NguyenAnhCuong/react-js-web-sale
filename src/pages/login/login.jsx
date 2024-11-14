import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
  notification,
} from "antd";
import "../register/register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/account/account.slice";
const Login = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await postLogin(username, password);
    setIsSubmit(false);
    if (res?.data) {
      dispatch(doLogin(res.data.user));
      localStorage.setItem("access_token", res?.data.access_token);
      message.success("Đăng Nhập thành công");
      navigate("/");
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
              <h1 style={{ textAlign: "center" }}>Đăng Nhập</h1>
              <Divider />
            </div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="username"
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

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <h4 style={{ textAlign: "center", margin: "15px 0px" }}>Or</h4>
            <div>
              Chưa có Tài Khoản ? <NavLink to={"/register"}>Đăng nhập</NavLink>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
