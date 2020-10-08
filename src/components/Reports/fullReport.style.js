import styled from "styled-components";

const FullReportWrap = styled.div`
  background-color: #141414;
  .ant-carousel-vertical .slick-dots li {
    background-color: #15395b;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .ant-carousel .slick-dots li button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .ant-carousel .slick-dots li.slick-active button {
    background-color: #1690f5;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;

export default FullReportWrap;
