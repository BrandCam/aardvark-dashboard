import React from "react";
import ChatDrawer from "../chatBox/chatDrawer";
import EdditDrawer from "./edditReport";
import ChatBody from "../chatBox/chatBody";
import ChatBoxInput from "../chatBox/chatBoxInput";
import { Empty, Image, Button } from "antd";
import FullReportWrap, { MyCarousel } from "./fullReport.style";
import ConvertTimestamp from "../../Helpers/dateConversion";
import { COLOR_TABLE } from "../../colors";
import PlaceHolder from "../UI/cardPlaceHolder";
import Loader from "../UI/loader";

const FullReport = ({
  toggelUpdate,
  updateVisible,
  report,
  loading,
  error,
  showComments,
  setShowComments,
}) => {
  if (loading) {
    return (
      <PlaceHolder height={"50vh"}>
        <Loader size={200} color="#39FF14" />
      </PlaceHolder>
    );
  }
  if (error) {
    return (
      <PlaceHolder height={"50vh"}>
        <h1 style={{ color: "white" }}>Error! : {error.message}</h1>
      </PlaceHolder>
    );
  }
  return report ? (
    <>
      <FullReportWrap>
        <div className="head">
          <div
            className="tag"
            style={{
              backgroundColor: `${
                report.category === "Suggestion"
                  ? "rgba(57,255,20, 0.3)"
                  : "rgba(255, 7, 58, 0.3)"
              }`,
              border: `1px solid ${
                report.category === "Suggestion"
                  ? "rgba(57,255,20, 0.5)"
                  : "rgba(255, 7, 58, 0.5)"
              }`,
              color: `${
                report.category === "Suggestion"
                  ? "rgb(57,255,20)"
                  : "rgb(255, 7, 58)"
              }`,
            }}
          >
            {report.category}
          </div>
          {report.created_by ? (
            <div className="created-by">
              Submitted By :{" "}
              {report.created_by.display_name ? (
                <>
                  <span>{report.created_by.display_name}</span>{" "}
                  {report.guest_creator ? report.guest_creator : ""}
                </>
              ) : (
                <span>{report.created_by.email}</span>
              )}
            </div>
          ) : (
            <div className="created-by">
              Submitted By :<span> Guest</span>
            </div>
          )}
          <div
            className="tag"
            style={{
              backgroundColor: `rgba${COLOR_TABLE[report.severity]}, 0.3)`,
              border: `1px solid rgba${COLOR_TABLE[report.severity]}, 0.5)`,
              color: `rgb${COLOR_TABLE[report.severity]})`,
            }}
          >
            {report.severity}
          </div>
        </div>
        <div className="description">
          <p>{report.description} </p>
        </div>
        <div className="imgs">
          {report.img_urls.length > 1 ? (
            <MyCarousel
              effect="fade"
              dotPosition="left"
              dots={{ className: "dots" }}
            >
              {report.img_urls.map((url) => (
                <Image
                  key={url}
                  placeholder
                  width={300}
                  height={300}
                  src={url}
                />
              ))}
            </MyCarousel>
          ) : report.img_urls.length === 1 ? (
            <Image
              placeholder
              width={300}
              height={300}
              src={report.img_urls[0]}
            />
          ) : (
            <Image placeholder width={300} height={300} />
          )}
        </div>
        <div className="foot">
          <div className="info">
            <div className="video">
              Video URL :{" "}
              <span>{report.video_url ? report.video_url : "NA"}</span>
            </div>
            <div className="date">
              Submitted On :{" "}
              <span>{ConvertTimestamp(parseInt(report.createdAt))}</span>
            </div>
          </div>

          <Button ghost onClick={() => setShowComments(!showComments)}>
            Comments
          </Button>
        </div>
      </FullReportWrap>
      <EdditDrawer
        report={report}
        visable={updateVisible}
        setVisable={toggelUpdate}
      />
      <ChatDrawer
        height="60%"
        title="Comments"
        mask={false}
        placement="bottom"
        onClose={() => {
          setShowComments(false);
        }}
        visible={showComments}
        key="bottom"
        footer={<ChatBoxInput report_id={report.id} />}
      >
        <ChatBody comments={report.comments}></ChatBody>
      </ChatDrawer>
    </>
  ) : (
    <Empty />
  );
};

export default FullReport;
