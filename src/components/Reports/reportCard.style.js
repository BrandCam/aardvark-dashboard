import styled from "styled-components";

const ReportWrap = styled.div`
  margin-bottom: 15px;
  background-color: #eee;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #141414;
  font-size: 1.5rem;
  border-radius: 10px;
  -webkit-box-shadow: 0 8px 6px -6px black;
  -moz-box-shadow: 0 8px 6px -6px black;
  box-shadow: 0 8px 6px -6px black;

  .type {
    display: inline flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    padding: 5px;
    p {
      all: unset;
    }
  }

  .description {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 3;

    .severity {
      font-size: 1rem;
      margin-right: 10px;
      display: flex;
      flex-direction: row;
      margin-left: 15px;
      padding-left: 10px;
      padding-right: 10px;
    }
    p {
      margin-right: 10px;
      margin-bottom: 0;
      flex-grow: 2;
      color: #fff;
    }
  }

  .button {
    align-self: center;
    background-color: #262626;
    margin-right: 5px;
    border: none;
    color: #fff;
  }
  .button:hover {
    color: #1890fe;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default ReportWrap;
