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
  width: ${(props) => props.width || ""};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
  .card {
    width: 100%;
    position: relative;
    background: linear-gradient(to top, #001427, #002140);

    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    opacity: ${({ active }) => (active ? "1" : "0.5")};
    transition: 0.5s;
    border-radius: 10px;
  }
  .card::before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 2px;
    left: 2px;
    bottom: 2px;
    width: 50%;
    pointer-events: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .line {
    display: ${(props) => (props.animated ? "" : "none")};
    transition: 0.5;
    opacity: ${({ active }) => (active ? "1" : "0")};
  }
  .card .line-two {
    position: absolute;
    top: 0;
    right: 0;
    width: 3px;
    height: 100%;
    background: ${({ active }) =>
      active
        ? "linear-gradient(to bottom, transparent,  #39FF14)"
        : "linear-gradient(to bottom, transparent,  #1779ff)"};
    animation: ${animate2} 2s linear infinite;
    animation-delay: 1s;
  }
  .card .line-three {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${({ active }) =>
      active
        ? "linear-gradient(to top, transparent,  #39FF14)"
        : "linear-gradient(to top, transparent,  #1779ff)"};
    animation: ${animate3} 2s linear infinite;
    animation-delay: 1s;
  }
  .card .line-four {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${({ active }) =>
      active
        ? "linear-gradient(to left, transparent,  #39FF14)"
        : "linear-gradient(to left, transparent,  #1779ff)"};
    animation: ${animate4} 2s linear infinite;
  }
  .card .line-one {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${({ active }) =>
      active
        ? "linear-gradient(to right, transparent,  #39FF14)"
        : "linear-gradient(to right, transparent,  #1779ff)"};
    animation: ${animate1} 2s linear infinite;
  }

  .card:hover content,
  .card:hover,
  .card:hover .line {
    opacity: 1;
  }
`;
const ContentCard = ({ animated, width, onClick, active, children, style }) => {
  return (
    <CardWrap
      active={active}
      animated={animated}
      width={width}
      onClick={onClick}
    >
      <div style={style} className="card">
        <span className="line line-one"></span>
        <span className="line line-two"></span>
        <span className="line line-three"></span>
        <span className="line line-four"></span>
        {children}
      </div>
    </CardWrap>
  );
};

export default ContentCard;
