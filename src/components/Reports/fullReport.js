import React, { useState } from "react";
import EdditDrawer from "./edditReport";
import { Empty, Carousel, Image, Button } from "antd";
import FullReportWrap from "./fullReport.style";
import ConvertTimestamp from "../../Helpers/dateConversion";

const FullReport = ({
  toggelUpdate,
  updateVisible,
  report,
  loading,
  error,
}) => {
  let [showComments, setShowComments] = useState(false);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error! : {error.message}</p>;
  return report ? (
    <>
      <FullReportWrap>
        <div>
          <div>{report.category}</div>
          {report.created_by ? (
            <div>
              Created By:{" "}
              {report.created_by.display_name
                ? report.created_by.display_name
                : report.created_by.email}
            </div>
          ) : (
            <div>Created By: Guest</div>
          )}
          <div>{report.severity}</div>
        </div>
        <div>
          <p>{report.description} </p>
        </div>
        <div>
          {report.img_urls.length > 1 ? (
            <Carousel
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
            </Carousel>
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
          <div>
            <div>Video URL : {report.video_url ? report.video_url : "NA"}</div>
            <div>
              Submitted On : {ConvertTimestamp(parseInt(report.createdAt))}
            </div>
            <Button>Comments</Button>
          </div>
        </div>
      </FullReportWrap>
      <EdditDrawer
        report={report}
        visable={updateVisible}
        setVisable={toggelUpdate}
      />
    </>
  ) : (
    <Empty />
  );
};

export default FullReport;
