import React from "react";
import styled, { keyframes } from "styled-components";
const animate1 = keyframes`
0%{
 transform: translateX(-100%);
}100%{
    transform: translateX(100%);
}
`;
const animate2 = keyframes`
0%{
 transform: translateY(-100%);
}100%{
    transform: translateY(100%);
}
`;
const animate3 = keyframes`
0%{
 transform: translateY(100%);
}100%{
    transform: translateY(-100%);
}
`;
const animate4 = keyframes`
0%{
 transform: translateX(100%);
}100%{
    transform: translateX(-100%);
}
`;

const CardWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
  .card {
    position: relative;
    background: linear-gradient(to top, #001427, #002140);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    opacity: 0.5;
    transition: 0.5s;
    border-radius: 10px;
  }
  .card::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    bottom: 2px;
    width: 50%;
    background: linear-gradient(to top, #001427, #002140);
    pointer-events: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  span {
    transition: 0.5;
    opacity: 0;
  }
  .card span:nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #1779ff);
    animation: ${animate2} 2s linear infinite;
    animation-delay: 1s;
  }
  .card span:nth-child(3) {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(to top, transparent, #1779ff);
    animation: ${animate3} 2s linear infinite;
    animation-delay: 1s;
  }
  .card span:nth-child(4) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to left, transparent, #1779ff);
    animation: ${animate4} 2s linear infinite;
  }
  .card span:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, transparent, #1779ff);
    animation: ${animate1} 2s linear infinite;
  }

  .card:hover content,
  .card:hover,
  .card:hover span {
    opacity: 1;
  }
`;
const ContentCard = (props) => {
  return (
    <CardWrap>
      <div className="card">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="content">{props.children}</div>
      </div>
    </CardWrap>
  );
};

export default ContentCard;
