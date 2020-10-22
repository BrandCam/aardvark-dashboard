import styled from "styled-components";
import { Carousel } from "antd";

export const MyCarousel = styled(Carousel)`
  overflow: auto;
  &::-webkit-scrollbar-track {
    background: #141414;
  }

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #33bbf1;
  }
  .slick-slide {
    div:nth-child(1) {
      display: flex;
      justify-content: center;
    }
  }

  slick-list {
  }
`;

export const FullReportWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  background-color: #141414;
  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .tag {
      align-self: flex-start;
      display: inline flex;
      font-size: 1.5em;
      align-items: center;
      justify-content: center;
      min-width: 80px;
      padding: 5px;
    }
    .created-by {
      font-size: 1.5rem;
      span {
        color: #29f514;
      }
    }
  }
  .imgs {
    display: flex;
    min-height: 300px;
    margin-bottom: 20px;
    width: 100%;
    .ant-carousel {
      width: 100%;
    }
  }
  .imgs > .ant-image {
    margin: 0 auto;
  }
  .foot {
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      align-self: flex-end;
    }
    span {
      color: #29f514;
    }
  }

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
