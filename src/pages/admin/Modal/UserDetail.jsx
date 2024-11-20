import { Button, Drawer } from "antd";
import { Badge, Descriptions } from "antd";
import moment from "moment";

const UserDetail = (props) => {
  const { open, setOpen, dataViewDetail } = props;

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        width={"50vw"}
        onClose={onClose}
        open={open}
      >
        <Descriptions column={2} title="User Info" bordered>
          <Descriptions.Item label="Id">
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên hiển thị">
            {dataViewDetail?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataViewDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {dataViewDetail?.phone}
          </Descriptions.Item>

          <Descriptions.Item label="Role" span={2}>
            <Badge status="processing" text={dataViewDetail?.role} />
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default UserDetail;
