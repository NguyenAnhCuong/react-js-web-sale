import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
const BookViewDetail = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;

  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null);
  };
  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions title="Thông tin Sách" bordered column={2}>
          <Descriptions.Item label="Id">
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên Sách">
            {dataViewDetail?.mainText}
          </Descriptions.Item>
          <Descriptions.Item label="Thể loại">
            {dataViewDetail?.category}
          </Descriptions.Item>
          <Descriptions.Item label="Tác giả">
            {dataViewDetail?.author}
          </Descriptions.Item>

          <Descriptions.Item label="Giá tiền" span={2}>
            {dataViewDetail?.price}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format(FORMAT_DATE_DISPLAY)}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail?.updatedAt).format(FORMAT_DATE_DISPLAY)}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
export default BookViewDetail;
