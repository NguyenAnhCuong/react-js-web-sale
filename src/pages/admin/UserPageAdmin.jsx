import {
  Table,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch";
import { useEffect, useState } from "react";
import { deleteAUser, fetchListUserPaginate } from "../../services/userApi";
import { IoReload } from "react-icons/io5";
import { FaUserPlus, FaFileExport, FaTrash } from "react-icons/fa";
import { TfiImport } from "react-icons/tfi";
import { DeleteTwoTone } from "@ant-design/icons";
import UserDetail from "./Modal/UserDetail";
import UserCreate from "./Modal/UserCreate";
import UserUploadFile from "./Modal/UserUploadFile";

const UserPageAdmin = () => {
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <>
            <a
              style={{ textDecoration: "none" }}
              href="#"
              onClick={() => {
                setOpen(true);
                setDataView(record);
              }}
            >
              {record._id}
            </a>
          </>
        );
      },
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
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
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này ?"}
              onConfirm={() => handleDeleteUser(record._id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <FaTrash />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [dataView, setDataView] = useState({});
  const [listUser, setListUser] = useState([]);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchListUser();
  }, [currentPage, pageSize, filter, sort]);

  const fetchListUser = async () => {
    setIsLoading(true);
    let query = `current=${currentPage}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sort) {
      query += `&${sort}`;
    }

    const res = await fetchListUserPaginate(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setSort(q);
    }
  };

  const handleDeleteUser = async (userId) => {
    const res = await deleteAUser(userId);
    if (res && res.data) {
      message.success("Xóa user thành công");
      fetchListUser();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  const handleSearch = (query) => {
    setFilter(query);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch setFilter={setFilter} handleSearch={handleSearch} />
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
                    <div style={{ display: "flex", gap: "15px" }}>
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
                        type="primary"
                        icon={
                          <TfiImport
                            size={"1.1rem"}
                            style={{ marginRight: "5px" }}
                          />
                        }
                        onClick={() => setOpenImportModal(true)}
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
                        onClick={() => setOpenCreate(true)}
                        size={"large"}
                      >
                        Thêm mới
                      </Button>

                      <IoReload
                        onClick={() => {
                          setFilter("");
                          setSort("");
                        }}
                        style={{ cursor: "pointer", margin: "15px 30px" }}
                        size={"1.1rem"}
                      />
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
            isLoading={isLoading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total,
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]}-{range[1]} trên {total}
                  </div>
                );
              },
            }}
          />
        </Col>
      </Row>
      <UserDetail dataViewDetail={dataView} open={open} setOpen={setOpen} />
      <UserCreate
        fetchListUser={fetchListUser}
        isModalOpen={openCreate}
        setIsModalOpen={setOpenCreate}
      />
      <UserUploadFile
        fetchListUser={fetchListUser}
        openModal={openImportModal}
        setOpenModal={setOpenImportModal}
      />
    </>
  );
};

export default UserPageAdmin;
