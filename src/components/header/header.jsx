import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Divider, Avatar, Badge, Drawer, message, Popover } from "antd";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";
import { doLogOut } from "../../services/authApi";
import { doLogOutAction } from "../../redux/account/account.slice";
import { Link } from "react-router-dom";
import "../../styles/global.scss";
import ManageAccount from "../account/ManageAccount";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.order.carts);
  const [showManageAccount, setShowManageAccount] = useState(false);

  const handleLogout = async () => {
    const res = await doLogOut();
    if (res && res.data) {
      dispatch(doLogOutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  let items = [
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => setShowManageAccount(true)}
        >
          Quản lý tài khoản
        </label>
      ),
      key: "account",
    },
    {
      label: <Link to="/history">Lịch sử mua hàng</Link>,
      key: "history",
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
    items.unshift({
      label: <Link to={"/admin"}>Trang quản trị</Link>,
      key: "admin",
    });
  }

  const urlAvatar = `${import.meta.env.VITE_BASE_URL}/images/avatar/${
    user.avatar
  }`;

  const contentPopover = () => {
    return (
      <div className="pop-cart-body">
        <div className="pop-cart-content">
          {carts?.map((book, index) => {
            return (
              <div className="book" key={`book-${index}`}>
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/images/book/${
                    book?.detail?.thumbnail
                  }`}
                />
                <div>{book?.detail?.mainText}</div>
                <div className="price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(book?.detail?.price ?? 0)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="pop-cart-footer">
          <button onClick={() => navigate("/order")}>Xem giỏ hàng</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <span
                className="logo"
                onClick={() => {
                  navigate("/");
                }}
              >
                <FaReact className="rotate icon-react" /> Hỏi Dân IT
                <VscSearchFuzzy className="icon-search" />
              </span>
              <input
                className="input-search"
                type={"text"}
                placeholder="Bạn tìm gì hôm nay"
              />
            </div>
          </div>
          <nav className="page-header__bottom">
            <ul id="navigation" className="navigation">
              <li className="navigation__item">
                <Popover
                  className="popover-carts"
                  placement="topRight"
                  rootClassName="popover-carts"
                  title={"Sản phẩm mới thêm"}
                  content={contentPopover}
                  arrow={true}
                >
                  <Badge count={carts?.length ?? 0} size={"small"} showZero>
                    <FiShoppingCart className="icon-cart" />
                  </Badge>
                </Popover>
              </li>
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")}> Tài Khoản</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Avatar shape="square" size="large" src={urlAvatar} />{" "}
                        {user?.fullName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quản lý tài khoản</p>
        <Divider />

        <p>Đăng xuất</p>
        <Divider />
      </Drawer>
      <ManageAccount
        isModalOpen={showManageAccount}
        setIsModalOpen={setShowManageAccount}
      />
    </>
  );
};

export default Header;
