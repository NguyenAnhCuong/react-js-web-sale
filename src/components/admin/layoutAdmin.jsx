import React, { useState } from "react";
import {
  AppstoreOutlined,
  ExceptionOutlined,
  HeartTwoTone,
  TeamOutlined,
  UserOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message, Avatar } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./layout.scss";
import { useDispatch, useSelector } from "react-redux";
import { doLogOutAction } from "../../redux/account/account.slice";
import { doLogOut } from "../../services/authApi";

const { Content, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: "dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: <span>Manage Users</span>,
    // key: 'user',
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to="/admin/user">CRUD</Link>,
        key: "crud",
        icon: <TeamOutlined />,
      },
      {
        label: "Files1",
        key: "file1",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    label: <Link to="/admin/book">Manage Books</Link>,
    key: "book",
    icon: <ExceptionOutlined />,
  },
  {
    label: <Link to="/admin/order">Manage Orders</Link>,
    key: "order",
    icon: <DollarCircleOutlined />,
  },
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = useSelector((state) => state.account.user);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await doLogOut();
    if (res && res.data) {
      dispatch(doLogOutAction());
      message.success("Đăng xuất thành công");
      Navigate("/");
    }
  };

  let itemsDropdown = [
    {
      label: <label>Quản lý tài khoản</label>,
      key: "account",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
  if (user?.role === "ADMIN") {
    itemsDropdown.unshift({
      label: <Link to={"/"}>Trang chủ</Link>,
      key: "admin",
    });
  }
  const urlAvatar = `${import.meta.env.VITE_BASE_URL}/images/avatar/${
    user.avatar
  }`;

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout-admin">
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ height: 32, margin: 16, textAlign: "center" }}>Admin</div>
        <Menu
          defaultSelectedKeys={[activeMenu]}
          mode="inline"
          items={items}
          onClick={(e) => setActiveMenu(e.key)}
        />
      </Sider>
      <Layout>
        <div className="admin-header">
          <span>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </span>
          <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar shape="square" size="large" src={urlAvatar} />{" "}
                {user?.fullName}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <Content style={{ padding: "15px" }}>
          <Outlet />
        </Content>
        {/* <Footer style={{ padding: 0 }}>
          React Test Fresher &copy; Hỏi Dân IT - Made with <HeartTwoTone />
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
