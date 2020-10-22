import { Upload } from "antd";
import ReportModal from "../components/UI/reportModal";
import { PictureOutlined } from "@ant-design/icons";
import React from "react";
import { app } from "../firebase";
import { useState } from "react";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const PicturesWall = (props) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  let { fileList, setFileList } = props;

  const customRequest = async ({ file, onSuccess }) => {
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.uid);
    const success = await fileRef.put(file);
    if (!success) {
      return;
    }
    onSuccess("ok");

    const url = await fileRef.getDownloadURL();

    props.setImgUrls([...props.imgUrls, url]);
  };
  const handleRemove = async ({ uid }) => {
    const index = fileList.findIndex((file) => file.uid === uid);
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(uid);
    const success = await fileRef.delete();
    const newUrls = [...props.imgUrls];
    newUrls.splice(index, 1);
    props.setImgUrls(newUrls);

    if (success) {
      return true;
    }
  };
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList }) => {
    // this.setState({ fileList });
    setFileList(fileList);
  };

  const uploadButton = (
    <div>
      <PictureOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        customRequest={customRequest}
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={(file) => handleRemove(file)}
      >
        {fileList.length >= 6 ? null : uploadButton}
      </Upload>
      <ReportModal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </ReportModal>
    </>
  );
};

export default PicturesWall;
