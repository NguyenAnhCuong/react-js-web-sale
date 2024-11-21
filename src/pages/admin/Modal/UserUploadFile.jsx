import { Divider, Modal, Table } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const UserUploadFile = (props) => {
  const { openModal, setOpenModal } = props;
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const propsUpload = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: "",
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Modal
        title={"Import Data User"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        cancelText={"Đóng"}
        okText={"Confirm"}
        onOk={""}
      >
        <Divider />
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        <div style={{ paddingTop: "20px" }}>
          <Table
            title={() => <span>Dữ liệu Upload:</span>}
            columns={[
              { dataIndex: "fullName", title: "Tên hiển thị" },
              { dataIndex: "email", title: "Email" },
              { dataIndex: "phone", title: "Số điện thoại" },
            ]}
          ></Table>
        </div>
      </Modal>
    </>
  );
};

export default UserUploadFile;
