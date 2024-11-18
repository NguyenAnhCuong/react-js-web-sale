import { Table, Row, Col, Button } from "antd";
import InputSearch from "./InputSearch";
import { useEffect, useState } from "react";
import { fetchListUserPaginate } from "../../services/userApi";
import { IoReload } from "react-icons/io5";
import { FaUserPlus, FaFileExport } from "react-icons/fa";
import { TfiImport } from "react-icons/tfi";

const UserPageAdmin = () => {
  const [listUser, setListUser] = useState([]);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchListUser();
  }, [currentPage, pageSize]);

  const fetchListUser = async () => {
    const res = await fetchListUserPaginate(currentPage, pageSize);
    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Tên hiển thị",
      dataIndex: "FullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <button>Edit</button>
            <button>Delete</button>
          </>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch />
        </Col>
        <Col span={24}>
          <Table
            title={() => {
              return (
                <>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ fontSize: "20px", fontWeight: "600" }}>
                      Table User
                    </div>
                    <div style={{ display: "inline-block" }}>
                      <Button
                        type="primary"
                        icon={
                          <FaFileExport
                            size={"1.1rem"}
                            style={{ marginRight: "5px" }}
                          />
                        }
                        size={"large"}
                      >
                        Export
                      </Button>
                      <Button
                        style={{ margin: "0 15px" }}
                        type="primary"
                        icon={
                          <TfiImport
                            size={"1.1rem"}
                            style={{ marginRight: "5px" }}
                          />
                        }
                        size={"large"}
                      >
                        Import
                      </Button>
                      <Button
                        type="primary"
                        icon={
                          <FaUserPlus
                            size={"1.1rem"}
                            style={{ marginRight: "5px" }}
                          />
                        }
                        size={"large"}
                      >
                        Thêm mới
                      </Button>

                      <IoReload style={{ margin: "0 30px" }} size={"1.1rem"} />
                    </div>
                  </div>
                </>
              );
            }}
            className="def"
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
            rowKey={"_id"}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default UserPageAdmin;
